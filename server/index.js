const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/user')
const Blog = require('./models/blog')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');



const requireAuth = require("./middleware/requireAuth");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/assignment')
    .then(() => {
        console.log('✅ Mongoose connected successfully');
    })
    .catch((error) => {  // Always catch the error parameter!
        console.log('❌ Mongoose connection error:', error.message);
    });

app.listen('3000', () => {
    console.log("server running at port 3000")
})

app.get('/api/me', requireAuth, (req, res) => {


    const userId = req.user.userId;
    const isAdmin = req.user.isAdmin;

    res.status(200).json({ userId, isAdmin })
})

app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        username,
        password: hashedPassword,
        isAdmin: false
    })

    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser._id, isAdmin: savedUser.isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" })
    res.cookie("token", token, { httpOnly: true, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.status(200).json({ msg: "signedIn" });

})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ msg: "user not found", loggedIn: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ msg: "wrong username or password", loggedIn: false });
    }

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, { httpOnly: true, sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.status(200).json({ msg: "user logged in successfully", loggedIn: true, isAdmin: user.isAdmin })
})

app.post('/api/blogs', requireAuth, async (req, res) => {
    const { title, content } = req.body;

    const newBlog = new Blog({
        title,
        content,
        authorId: req.user.userId
    })

    await newBlog.save();

    res.status(201).json({ msg: "post created" });
})

app.post("/api/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // true in production (HTTPS)
        sameSite: "lax"
    });

    res.json({ message: "Logged out successfully" });
});


app.get('/api/blogs', requireAuth, async (req, res) => {
    //if req.user.isAdmin = true i want all blogs else i get with authorId = rq.user.userId
    let blogs;
    if (req.user.isAdmin) {
        blogs = await Blog.find().populate('authorId', 'username');
    } else {
        blogs = await Blog.find({ authorId: req.user.userId }).populate('authorId', 'username');
    }

    res.status(200).json(blogs);
})


app.delete('/api/blogs/:blogId', requireAuth, async (req, res) => {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);

    if (!blog) {
        return res.status(404).json({ msg: "Blog not found" });
    }

    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({ msg: "blog deleted" });

})


app.get('/api/blogs/:id', requireAuth, async (req, res) => {


    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        return res.status(404).json({ msg: "Blog not found" });
    }
    console.log(blog)
    res.json(blog);

});


app.put('/api/blogs/:id', requireAuth, async (req, res) => {
    try {
        const { title, content } = req.body;

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ msg: "Blog not found" });
        }

        
        if (
            blog.authorId.toString() !== req.user.userId &&
            !req.user.isAdmin
        ) {
            return res.status(403).json({ msg: "Not authorized" });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;

        await blog.save();

        res.json(blog);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});