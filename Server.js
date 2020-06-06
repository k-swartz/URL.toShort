require('dotenv').config()

const Express = require('express');
const Applicaiton = Express();
const Mongoose = require('mongoose');
const ShortURL = require('./models/ShortURL.js');

Mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

Applicaiton.set('view engine', 'ejs');
Applicaiton.use(Express.urlencoded({
    extended: true
}));

Applicaiton.get("/", async (Reqest, Response) => {
    const ShortURLs = await ShortURL.find({Enabled: true}).sort( { Clicks: 1 });
    Response.render('index', {
        ShortURLs: ShortURLs
    });
});

Applicaiton.post('/ShortURL', async (Request, Response) => {
    await ShortURL.create({
        FullURL: Request.body.FullURL
    });
    Response.redirect('./');
});

Applicaiton.get('/Delete/:ShortURL', async (Request, Response) => {
    const Short = await ShortURL.findOne({
        Short: Request.params.ShortURL
    });
    if (Short.Clicks <= 5) {
        Short.Enabled = false;
        Short.save();
    }
    Response.redirect('../');
});


Applicaiton.get("/:ShortURL", async (Request, Response) => {
    const Short = await ShortURL.findOne({
        Short: Request.params.ShortURL
    });
    if (Short === null) return Response.sendStatus(404);
    Short.Clicks++;
    Short.save();
    Response.redirect(Short.FullURL);
});

Applicaiton.listen(process.env.PORT_NUMBER || 3000);