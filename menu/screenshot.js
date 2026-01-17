const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true, // run headless
        args: ['--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows']
    });
    const page = await browser.newPage();

    // Load your HTML file (must use file:// for local HTML)
    await page.goto(`file:///Users/briannamcdonald/Documents/GitHub/macsconvenience/menu/menu.html`, { waitUntil: 'networkidle0' });

    // Get the height of the menu-container using getBoundingClientRect().height
    const menuContainerHeight = await page.evaluate(() => {
        const menuContainer = document.querySelector('.menu-container');
        return menuContainer ? menuContainer.getBoundingClientRect().height : 0;
    });

    const menuContainerWidth = await page.evaluate(() => {
        const menuContainer = document.querySelector('.menu-container');
        return menuContainer ? menuContainer.getBoundingClientRect().width : 0;
    });

    // Set viewport height based on the menu container height
    await page.setViewport({ width: Math.ceil(menuContainerWidth), height: Math.ceil(menuContainerHeight) });

    await page.screenshot({
        path: '../menu.png',
        omitBackground: false
    });

    await browser.close();
})();