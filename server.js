const express = reqire('express');
const morgan = reqire('morgan');

const app = express();

const blogRouter = reqire('./blogRouter');

//log http layer
app.use(morgan('common'));

app.use('/blog-posts', blogRouter);