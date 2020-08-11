const puppeteer = require('puppeteer');
const { writeFileSync } = require('fs');
(async () => {
    const browser = await puppeteer.launch({
        //headless: false, para abrir o navegador
    });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/rocketseat_oficial/');
    //await page.screenshot({ path: 'instagram.png' });
    //await page.pdf({path: 'instagram.pdf', format: 'A4'});
    const imgList = await page.evaluate(() => {
        //pegar todas as imagens que estão na parte de posts
        const nodeList = document.querySelectorAll('article img');
        //Trasnformar o nodeList em array
        const imgArray = [...nodeList];
        //trasnforma os nodes (elementos) em objetos
        const imgList = imgArray.map( ({ src }) =>({
            src
        }));
        console.log({imgList});
        return imgList;
    })
    await browser.close();
    //escrever as imagens em um arquivo local
    try{
        writeFileSync('instagram.json', JSON.stringify(imgList, null, 2));
    }
    catch(err){
        console.log(err);
        throw new Error('ops..')
    }
})();