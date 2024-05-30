const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.get(`/:id`, async (req, res) => {
    const url = "https://api.github.com/users/" + req.params.id + "/repos?per_page=100";
    const response = await fetch(url, {
        method: "GET",
    })
    .then((response) => response.json());
    const forkCount = {};
    let languages = {};
    for (let r of response) {
        forkCount[r['name']] = r['forks_count'];
        if (r['language'] in languages) {
            languages[r['language']]++;
        }
        else {
            languages[r['language']] = 1;
        }
    }
    const languagesSorted = Object.entries(languages).sort((a,b)=>b[1]-a[1]);
    languages = {};
    languagesSorted.forEach(function(item) {
        languages[item[0]]=item[1];
    })
    res.json({
        repoCount: response.length,
        forkCount: forkCount,
        languages: languages,
    })
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})