import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.static("views/partials"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

// Sample blogPosts data
let blogPosts = [];

// Routes

// Home page
app.get("/", (req, res) => {
    const messageSent = req.query.messageSent === 'true';
    const subscribeSent = req.query.subscribeSent === 'true';
    res.render("index.ejs", { messageSent, subscribeSent });
});

// Render home page for "/home"
app.get("/home", (req, res) => {
    const messageSent = req.query.messageSent === 'true';
    const subscribeSent = req.query.subscribeSent === 'true';
    res.render("index.ejs", { messageSent, subscribeSent });
});

// Render blog post creation form for "/post"
app.get("/post", (req, res) => {
    res.render("blog.ejs");
});

// Display all blog posts for "/blogs"
app.get("/blogs", (req, res) => {
    res.render("display_blog.ejs", { blogPosts: blogPosts });
});

// Render about page for "/about"
app.get("/about", (req, res) => {
    res.render("about.ejs");
});

// Render blog creation form for "/create_blog"
app.get('/create_blog', (req, res) => {
    res.render('blog.ejs');
});

// Handle form submission for creating a new blog post
app.post('/create_blog', (req, res) => {
    const newPost = {
        name: req.body.name,
        blogkey: req.body.blogkey,
        title: req.body.title,
        image_url: req.body.image_url,
        content: req.body.content,
    };

    blogPosts.push(newPost); // Add the new blog post to the array
    res.redirect('/display_blog');
});

// Display all blog posts for "/display_blog"
app.get('/display_blog', (req, res) => {
    console.log(blogPosts);
    res.render('display_blog.ejs', { blogPosts: blogPosts });
});

// Handle form submission for subscribing to the newsletter
app.post('/subscribe', (req, res) => {
    const email = req.body.email;
    console.log(`Newsletter subscription request from: ${email}`);
    res.redirect('/?subscribeSent=true');
});

// Handle form submission for sending a message
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Message from ${name} (${email}): ${message}`);
    res.redirect('/?messageSent=true');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
