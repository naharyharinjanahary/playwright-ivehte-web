import { test, expect } from '@playwright/test';

test.describe('Ivehte web', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://staging-ivehte-dev.madait-lab.com/login');
    /****** Début Autentification ******/
    await page.locator('[placeholder="Entrez votre nom d\\\'utilisateur"]').click();
    await page.keyboard.type('coordinator@yopmail.com');
    await page.locator('[placeholder="Minimum 8 caractères"]').click();
    await page.keyboard.type('123456a!');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const connexion = page.locator('text=Se connecter').first();
    await Promise.all([
      //page.waitForNavigation(/*{ url: 'https://staging-ivehte-dev.madait-lab.com/login' }*/),
      connexion.click(),
      expect(page.locator('text=Mes patients du jour').first()).toBeVisible()
    ]);
    /****** Fin Autentification ******/ //*[@id="search-user"]
  })

  test.only('Filtrage agenda par date, spécialité et type affichage', async({ page }) => {
    const ongletAgenda = page.locator('text=Mon agenda').first();
    await ongletAgenda.click();
    await page.locator(`text=July 2022`).click();
    await page.locator('text=June').click();
    await page.locator('button:has-text("29")').click();
    // expect(page.locator(`text=Voir l'agenda de`).first()).toBeVisible();
    // await page.pause();
    await page.locator('[data-testid="KeyboardArrowDownIcon"]').first().click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.locator('[data-testid="KeyboardArrowDownIcon"]').nth(1).click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    // await page.pause();
  });


  test('Créer un événement', async ({ page }) => {
    /****** Début Test Mon agenda ******/
    const ongletAgenda = page.locator('text=Mon agenda').first();
    const addEven = page.locator('text=Créer un événement').first();

    // Cliquer sur Mon agenda
    await Promise.all([
     // page.waitForNavigation(/*{ url: 'https://staging-ivehte-dev.madait-lab.com/dashboard' }*/),
      ongletAgenda.click(),
      expect(page.locator(`text=Planning`).first()).toBeVisible(),
      addEven.click(),
      expect(page.locator('text=Sélectionnez un type').first()).toBeVisible(),
    ]);

    await page.locator('text=Type de l\' événement : Sélectionnez un type >> [data-testid="KeyboardArrowDownIcon"]').click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.locator('[placeholder="Renseigner le nom de votre patient\\.\\.\\."]').click();
    await page.keyboard.type('Alexandre Nguyen');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');
    await page.locator('text=Spécialité de l’intervenant :Sélectionner une spécialité >> [data-testid="KeyboardArrowDownIcon"]').click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.locator('text=Sélectionnez un ou plusieurs intervenant(s)').click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Escape');
    await page.locator('text=Type de consulation : Sélectionnez le type voulu >> [data-testid="KeyboardArrowDownIcon"]').click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.locator('text=Salle :Sélectionnez une salle >> [data-testid="KeyboardArrowDownIcon"]').click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.locator('[placeholder="Tapez votre texte"]').click();
    await page.keyboard.type('Test Auto');
    await page.pause();
  
    /****** Fin Test Mon agenda ******/
  
  });
})

