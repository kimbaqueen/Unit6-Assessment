
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
});

test('Choices div shows up when Draw button clicked', async () => {
    await driver.findElement(By.id('draw')).click();
    const choices = await driver.findElement(By.id('choices'));

    const isDisplayed = await choices.isDisplayed();
    await driver.sleep(5000);
    expect(isDisplayed).toBeTruthy;
});

test('player-duo div displys when Add to Duo button clicked', async () => {
    await driver.findElement(By.xpath("//button[contains(@class,'bot-btn')]")).click();
    const playerDuo = await driver.findElement(By.xpath("//div[contains(@class, 'player-duo')]"));

    const isDisplayed = await playerDuo.isDisplayed();
    await driver.sleep(5000);
    expect(isDisplayed).toBeTruthy;
});