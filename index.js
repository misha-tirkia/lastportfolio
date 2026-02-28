import express, { urlencoded } from 'express'
import mongoose, { mongo } from 'mongoose'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ნაცვლად უბრალო app.use(express.static('public')), დაწერე ეს:
app.use(express.static(path.join(__dirname, 'public')));

// დარწმუნდი, რომ მთავარი გვერდის როუტიც ასეთია:
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('ბაზასთან კავშირი დამყარდა')
    })
    .catch((err) => {
        console.error('ბაზასთან კავშირი ვერ დამყარდა', err)
    })

const Contact = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
})

const contact = mongoose.model('contact', Contact) 

app.post('/', async (req, res) => {
    try {
        // 1. ყოველი შემთხვევისთვის შევამოწმოთ, კავშირი თუ გვაქვს. 
        // თუ არა - დაველოდოთ დაკავშირებას.
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGO_URI);
        }

        const { name, email, subject, message } = req.body;
        
        const newmessage = new contact({
            name,
            email,
            subject,
            message
        });

        await newmessage.save();
        console.log('მონაცემები წარმატებით შეინახა ✅');
        res.redirect('/');
        
    } catch (err) {
        // ეს კონსოლში დაგიწერს ზუსტ მიზეზს (Vercel Logs-ში გამოჩნდება)
        console.error("დეტალური შეცდომა:", err); 
        res.status(500).send('ბაზაში შენახვა ვერ მოხერხდა: ' + err.message);
    }
});

const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`სერვერი ჩაირთო ${port} პორტზე`))


