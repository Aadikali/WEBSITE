const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);                       // | for templating
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())

const PORT = process.env.PORT || 3000

// Sample data for courses and testimonials
const coursesData = [
  {
    id: 1,
    title: "Machine Learning",
    description: "Master ML algorithms and techniques",
    rating: 4.8,
    students: 1234,
    price: 299,
    image: "/media/course-ml.jpg",
  },
  {
    id: 2,
    title: "AWS Cloud",
    description: "Complete AWS certification training",
    rating: 4.9,
    students: 2156,
    price: 399,
    image: "/media/course-aws.jpg",
  },
  {
    id: 3,
    title: "Cybersecurity",
    description: "Advanced security and ethical hacking",
    rating: 4.7,
    students: 987,
    price: 449,
    image: "/media/course-cyber.jpg",
  },
]

const testimonialsData = [
  {
    name: "Sarah Johnson",
    role: "Cloud Engineer",
    company: "TechCorp",
    message: "The AWS training was exceptional. I got certified and landed my dream job!",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "ML Engineer",
    company: "DataTech",
    message: "Outstanding machine learning course. The instructors are industry experts.",
    rating: 5,
  },
]

// Routes
app.get("/", (req, res) => {
  res.render("Home/index", {
    title: "Home - Transform Your Career",
    courses: coursesData,
    testimonials: testimonialsData,
    // cssFiles: [], // or just don't include, but empty array is safest
    // jsFiles: []
  })
})

app.get("/about", (req, res) => {
  res.render("Home/about", { title: "About Us - TechXservices" })
})

app.get("/courses", (req, res) => {
  res.render("Home/courses", {
    title: "Our Courses - TechXservices",
    courses: coursesData,
  })
})

app.get("/services", (req, res) => {
  res.render("Home/services", { title: "Our Services - TechXservices" })
})

app.get("/contact", (req, res) => {
  res.render("Home/contact", { title: "Contact Us - TechXservices" })
})

app.get('/cybersecurity', (req, res) => {
  res.render('NewPages/cybersecurity', {
    title: 'Cybersecurity Page',
    cssFiles: ['cybersecurity'],
    jsFiles: ['cybersecurity']
  });
});

app.get('/iso', (req, res) => {
  res.render('NewPages/iso', {
    title: 'ISO Page',
    cssFiles: ['iso'],
    jsFiles: ['iso']
  });
});

app.get('/management', (req, res) => {
  res.render('NewPages/management', {
    title: 'Management Page',
    cssFiles: ['management'],
    jsFiles: ['management']
  });
});

app.get('/ui-ux', (req, res) => {
  res.render('NewPages/ui-ux', {
    title: 'UI/UX Page',
    cssFiles: ['ui-ux'],
    jsFiles: ['ui-ux']
  });
});

app.get('/vpat', (req, res) => {
  res.render('NewPages/vpat', {
    title: 'VPAT Page',
    cssFiles: ['vpat'],
    jsFiles: ['vpat']
  });
});

// Contact form submission
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body
  // In a real app, you'd save this to a database or send an email
  console.log("Contact form submission:", { name, email, message })
  res.redirect("/contact?success=1")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
