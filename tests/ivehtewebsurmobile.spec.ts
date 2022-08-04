import { test, expect } from "@playwright/test";

test.describe("Ivehte web sur mobile", () => {
  /**
   * Authentification
   */
  test.beforeEach(async ({ page }) => {
    await page.goto("https://staging-ivehte-dev.madait-lab.com/login");
    /****** Début Autentification ******/
    await page
      .locator('[placeholder="Entrez votre nom d\\\'utilisateur"]')
      .click();
    await page.keyboard.type("coordinator@yopmail.com");
    await page.locator('[placeholder="Minimum 8 caractères"]').click();
    await page.keyboard.type("123456a!");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const connexion = page.locator("text=Se connecter").first();
    await Promise.all([
      //page.waitForNavigation(/*{ url: 'https://staging-ivehte-dev.madait-lab.com/login' }*/),
      connexion.click(),
      expect(page.locator("text=Mes patients du jour").first()).toBeVisible(),
    ]);
    /****** Fin Autentification ******/ //*[@id="search-user"]
  });

  /**
   * Ajouter un nouveau patient en saisisant les données
   */
  test("Ajout patient", async ({ page }) => {
    //await page.goto('https://staging-ivehte-dev.madait-lab.com/patients/add');
    await page
      .locator(
        'text=Tableau de bordMon agendaPatientsProgrammesHDJSecuritéParamètresLe programme de  >> [aria-label="open drawer"]'
      )
      .click();
    await page.locator("text=Patients").nth(2).click();
    await page.locator("text=Inscrire nouveau patient").click();
    await page.locator("text=Créer un nouveau patient").click();
    await page.locator('input[type="radio"]').first().check();
    await page.locator('input[type="radio"]').nth(1).check();
    await page.locator('[placeholder="Tapez le nom de naissance"]').click();
    await page.keyboard.type("TEST CI 2");
    await page.locator('[placeholder="Tapez le ou les prénoms"]').click();
    await page.keyboard.type("CD TEST 2");
    await page.locator('[placeholder="Toulouse"]').click();
    await page.keyboard.type("TEST 2");
    await page.locator('input[type="radio"]').nth(2).check();
    await page.locator('input[type="radio"]').nth(3).check();
    await page.locator('[placeholder="Tapez le nom de la profession"]').click();
    await page.keyboard.type("TEST 2");
    await page.locator('[placeholder="Tapez l\\\'adresse complète"]').click();
    await page.keyboard.type("TEST 2");
    await page.locator('[placeholder="Entrez le numéro téléphone"]').click();
    await page.keyboard.type("0330223663");
    await page.locator('[placeholder="Entrez l\\\'adresse mail"]').click();
    await page.keyboard.type("test2@gmail.com");
    await page.locator('button:has-text("Valider l\'inscription")').click();
  });

  /**
   * Rechercher un patient pour l'envoyer un message via email
   */
  test("Contacter un patient", async ({ page }) => {
    await page.goto("https://staging-ivehte-dev.madait-lab.com/dashboard");
    await page
      .locator(
        'text=Tableau de bordMon agendaPatientsProgrammesHDJSecuritéParamètresLe programme de  >> [aria-label="open drawer"]'
      )
      .click();
    await page.locator("text=Patients").nth(2).click();
    await page.locator('[placeholder="Rechercher"]').click();
    await page.keyboard.type("TEST CI 2");
    await page.locator("text=Contacter").first().click();
    await page.locator('[placeholder="Objet de l\\\'email"]').click();
    await page.keyboard.type("CICD AUTO TEST");
    await page
      .locator(
        "div:nth-child(3) > div:nth-child(2) > div > div > .MuiFormControl-root > .MuiOutlinedInput-root"
      )
      .click();
    await page.keyboard.type("CICD AUTO TEST IVEHTE");
    await page.locator('button:has-text("Envoyer message")').click();
  });

  /**
   * Vérification doublon patient
   */
  test("Vérification doublon patient", async ({ page }) => {
    await page
      .locator(
        'text=Tableau de bordMon agendaPatientsProgrammesHDJSecuritéParamètresLe programme de  >> [aria-label="open drawer"]'
      )
      .click();
    await page.locator("text=Patients").nth(2).click();
    await page.locator("text=Inscrire nouveau patient").click();
    await page.locator("text=Créer un nouveau patient").click();
    await page.locator('input[type="radio"]').first().check();
    await page.locator('input[type="radio"]').nth(1).check();
    await page.locator('[placeholder="Tapez le nom de naissance"]').click();
    await page.keyboard.type("TEST CI");
    await page.locator('[placeholder="Tapez le ou les prénoms"]').click();
    await page.keyboard.type("CD TEST");
    await page.locator('[placeholder="Toulouse"]').click();
    await page.keyboard.type("TEST");
    await page.locator('input[type="radio"]').nth(2).check();
    await page.locator('input[type="radio"]').nth(3).check();
    await page.locator('[placeholder="Tapez le nom de la profession"]').click();
    await page.keyboard.type("TEST");
    await page.locator('[placeholder="Tapez l\\\'adresse complète"]').click();
    await page.keyboard.type("TEST");
    await page.locator('[placeholder="Entrez le numéro téléphone"]').click();
    await page.keyboard.type("0330223665");
    await page.locator('[placeholder="Entrez l\\\'adresse mail"]').click();
    await page.keyboard.type("test2@gmail.com");
    await page.locator('button:has-text("Valider l\'inscription")').click();
    await page.locator("text=ok").click();
  });

  /**
   * Créer un événement
   */
   test('Créer un événement', async ({ page }) => {
    /****** Début Test Mon agenda ******/
    const ongletAgenda = page.locator('text=Mon agenda').first();
    const addEven = page.locator('text=Créer un événement').first();
    // Cliquer sur Mon agenda
    // await Promise.all([
    //  // page.waitForNavigation(/*{ url: 'https://staging-ivehte-dev.madait-lab.com/dashboard' }*/),
    //   ongletAgenda.click(),
    //   expect(page.locator(`text=Planning`).first()).toBeVisible(),
    //   addEven.click(),
    //   expect(page.locator('text=Sélectionnez un type').first()).toBeVisible(),
    // ]);
    await page
      .locator(
        'text=Tableau de bordMon agendaPatientsProgrammesHDJSecuritéParamètresLe programme de  >> [aria-label="open drawer"]'
      )
      .click();
    await page.locator('li[role="menuitem"]:has-text("Mon agenda")').nth(1).click();
    await page.locator('text=Planning').click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.locator('button:has-text("Créer un événement")').click();
    await page.locator('text=Type de l\' événement : Sélectionnez un type >> [data-testid="KeyboardArrowDownIcon"]').click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.locator('[placeholder="Renseigner le nom de votre patient\\.\\.\\."]').click();
    await page.keyboard.type('TEST CI 2 CD TEST 2');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter');
    await page.locator('text=Spécialité de l’intervenant :Sélectionner une spécialité >> [data-testid="KeyboardArrowDownIcon"]').click();
    await page.locator('text=Médecin généraliste').click();
    // await page.keyboard.press('ArrowDown');
    // await page.keyboard.press('Enter');
    await page.locator('text=Sélectionnez un ou plusieurs intervenant(s)').click();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    // await page.locator('#Langlois__ric').check();
    // await page.locator('#Legendre_Alfred').check();
    //await page.locator('#mui-27').click();
    // await page.locator('#Morel_Christiane').check();
    // await page.locator('#Lefort_Jean').check();
    // await page.locator('#Ferrand__tienne').check();
    // await page.pause();
    //await page.locator('#mui-14').click();
    await page.keyboard.press('Escape');
    await page.locator('text=Type de consulation : Sélectionnez le type voulu >> [data-testid="KeyboardArrowDownIcon"]').click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.locator('text=Salle :Sélectionnez une salle >> [data-testid="KeyboardArrowDownIcon"]').click();
    // await page.pause();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.locator('[placeholder="Tapez votre texte"]').click();
    await page.keyboard.type('Test Auto');
    //await page.locator('button:has-text("Valider")').click();
    // await page.pause();
    /****** Fin Test Mon agenda ******/
  });
});
