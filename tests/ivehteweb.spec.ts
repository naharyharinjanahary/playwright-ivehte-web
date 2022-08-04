import { test, expect } from "@playwright/test";

test.describe("Ivehte web", () => {
  /**
   * Authentification
   */
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/login");
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
   * Filtrage agenda par date, spécialité et type d'affichage
   */
  test.only("Agenda", async ({ page }) => {
    const ongletAgenda = page.locator("text=Mon agenda").first();
    await ongletAgenda.click();

    /** Début Agenda par personnel */
    // await page.locator("text=Voir l'agenda de").click();
    // await page.locator("text=Capucine Moulin").click();
    // //await page.locator("#Christiane_Morel_").check();
    // await page.locator('button:has-text("Valider")').click();
    // await page.pause();
    /** Fin Agenda par personnel */

    /** Début Agenda par date */
    await page.locator(`text=August 2022`).click();
    await page.locator("text=June").click();
    await page.locator('button:has-text("29")').click();
    // await page.pause();
    /** Fin Agenda par date */

    /** Début Agenda par spécialité et type affichage */
    await page.locator('[data-testid="KeyboardArrowDownIcon"]').first().click();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.locator('[data-testid="KeyboardArrowDownIcon"]').nth(1).click();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    // await page.pause();
    /** Fin Agenda par spécialité et type affichage */

    /****** Début Test Créer événement ******/
    //const ongletAgenda = page.locator("text=Mon agenda").first();
    const addEven = page.locator("text=Créer un événement").first();
    // Cliquer sur Mon agenda
    await Promise.all([
      // page.waitForNavigation(/*{ url: 'https://staging-ivehte-dev.madait-lab.com/dashboard' }*/),
      ongletAgenda.click(),
      expect(page.locator(`text=Planning`).first()).toBeVisible(),
      addEven.click(),
      expect(page.locator("text=Sélectionnez un type").first()).toBeVisible(),
    ]);
    await page
      .locator(
        'text=Type de l\' événement : Sélectionnez un type >> [data-testid="KeyboardArrowDownIcon"]'
      )
      .click();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page
      .locator('[placeholder="Renseigner le nom de votre patient\\.\\.\\."]')
      .click();
    await page.keyboard.type("Arthur Mace");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("Enter");
    await page
      .locator(
        'text=Spécialité de l’intervenant :Sélectionner une spécialité >> [data-testid="KeyboardArrowDownIcon"]'
      )
      .click();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page
      .locator("text=Sélectionnez un ou plusieurs intervenant(s)")
      .click();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.locator("text=Garcia Maggie").click();
    await page.keyboard.press("Tab");
    await page.locator("text=Jacquot Margaret").check();
    // await page.pause();
    await page.locator('#VALIDER').click();
    // await page.keyboard.press("Tab");
    // await page.keyboard.press("Tab");
    // await page.keyboard.press("Enter");
    // await page.locator("#mui-14").click();
    //await page.keyboard.press('Escape');
    await page
      .locator(
        'text=Type de consulation : Sélectionnez le type voulu >> [data-testid="KeyboardArrowDownIcon"]'
      )
      .click();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page
      .locator(
        'text=Salle :Sélectionnez une salle >> [data-testid="KeyboardArrowDownIcon"]'
      )
      .click();
    // await page.pause();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.locator('[placeholder="Tapez votre texte"]').click();
    await page.keyboard.type("Test Auto");
    await page.locator('button:has-text("Valider")').click();
    // await page.pause();
    /****** Fin Test Créer événement ******/
  });

  test.only("Add patient", async ({ page }) => {
    /** Début ajout patient */
    await page.goto('http://localhost:3000/patients/add');
    await page.locator('input[type="radio"]').first().check();
    await page.locator('input[type="radio"]').nth(1).check();
    await page.locator('[placeholder="Tapez le nom de naissance"]').click();
    await page.keyboard.type("TEST CI 2");
    await page.locator('[placeholder="Tapez le ou les prénoms"]').click();
    await page.keyboard.type("CD TEST 2");
    await page.locator('[placeholder="dd\\/mm\\/yyyy"]').click();
    await page.locator('[placeholder="dd\\/mm\\/yyyy"]').press('Control+a');
    await page.locator('[placeholder="dd\\/mm\\/yyyy"]').fill('01');
    await page.locator('[placeholder="dd\\/mm\\/yyyy"]').press('ArrowRight');
    await page.locator('[placeholder="dd\\/mm\\/yyyy"]').fill('01/04');
    await page.locator('[placeholder="dd\\/mm\\/yyyy"]').press('ArrowRight');
    await page.locator('[placeholder="dd\\/mm\\/yyyy"]').fill('01/04/1993');
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
    /** Fin ajout patient */
  })

  test.only("Contacter et modifier un patient", async ({ page }) => {
    /** Début contacter patient */
    await page.goto('http://localhost:3000/dashboard');
    await page.locator('#root ul[role="menu"] >> text=Patients').click();
    await page.locator('[placeholder="Rechercher"]').click();
    await page.keyboard.type("TEST CI 2 CD TEST 2");
    await page.locator('text=ModifierContacter >> #Contacter').click();
    await page.locator('[placeholder="Objet de l\\\'email"]').click();
    await page.keyboard.type("CICD AUTO TEST");
    await page.locator('div:nth-child(3) > div:nth-child(2) > div > div > .MuiFormControl-root > .MuiOutlinedInput-root').click();
    await page.keyboard.type("CICD AUTO TEST IVEHTE");
    await page.locator('button:has-text("Envoyer message")').click();
    /** Fin contacter patient */

    /** Debut modifier patient */
    await page.goto('http://localhost:3000/dashboard');
    await page.locator('#root ul[role="menu"] >> text=Patients').click();
    await page.locator('[placeholder="Rechercher"]').click();
    await page.keyboard.type("TEST CI 2 CD TEST 2");
    await page.locator('text=Modifier').click();
    await page.locator('[placeholder="Entrez l\\\'adresse mail"]').click();
    await page.locator('[placeholder="Entrez l\\\'adresse mail"]').press('Control+a');
    await page.keyboard.type("test2@yopmail.com");
    await page.locator('button:has-text("Enregistrer les modifications")').click();
    await page.locator('text=ok').click();
    /** Fin modifier patient */
  })

  /**
   * Créer un événement
   */
  // test("Créer un événement", async ({ page }) => {
  //   /****** Début Test Mon agenda ******/
  //   const ongletAgenda = page.locator("text=Mon agenda").first();
  //   const addEven = page.locator("text=Créer un événement").first();
  //   // Cliquer sur Mon agenda
  //   await Promise.all([
  //     // page.waitForNavigation(/*{ url: 'https://staging-ivehte-dev.madait-lab.com/dashboard' }*/),
  //     ongletAgenda.click(),
  //     expect(page.locator(`text=Planning`).first()).toBeVisible(),
  //     addEven.click(),
  //     expect(page.locator("text=Sélectionnez un type").first()).toBeVisible(),
  //   ]);
  //   await page
  //     .locator(
  //       'text=Type de l\' événement : Sélectionnez un type >> [data-testid="KeyboardArrowDownIcon"]'
  //     )
  //     .click();
  //   await page.keyboard.press("ArrowDown");
  //   await page.keyboard.press("ArrowDown");
  //   await page.keyboard.press("Enter");
  //   await page
  //     .locator('[placeholder="Renseigner le nom de votre patient\\.\\.\\."]')
  //     .click();
  //   await page.keyboard.type("Alexandre Nguyen");
  //   await page.keyboard.press("ArrowUp");
  //   await page.keyboard.press("Enter");
  //   await page
  //     .locator(
  //       'text=Spécialité de l’intervenant :Sélectionner une spécialité >> [data-testid="KeyboardArrowDownIcon"]'
  //     )
  //     .click();
  //   await page.keyboard.press("ArrowDown");
  //   await page.keyboard.press("Enter");
  //   await page
  //     .locator("text=Sélectionnez un ou plusieurs intervenant(s)")
  //     .click();
  //   await page.keyboard.press("Tab");
  //   await page.keyboard.press("Tab");
  //   await page.keyboard.press("Tab");
  //   await page.locator("#Morel_Christiane").check();
  //   await page.locator("#Lefort_Jean").check();
  //   await page.locator("#Ferrand__tienne").check();
  //   // await page.pause();
  //   await page.locator("#mui-14").click();
  //   //await page.keyboard.press('Escape');
  //   await page
  //     .locator(
  //       'text=Type de consulation : Sélectionnez le type voulu >> [data-testid="KeyboardArrowDownIcon"]'
  //     )
  //     .click();
  //   await page.keyboard.press("ArrowDown");
  //   await page.keyboard.press("Enter");
  //   await page
  //     .locator(
  //       'text=Salle :Sélectionnez une salle >> [data-testid="KeyboardArrowDownIcon"]'
  //     )
  //     .click();
  //   // await page.pause();
  //   await page.keyboard.press("ArrowDown");
  //   await page.keyboard.press("Enter");
  //   await page.locator('[placeholder="Tapez votre texte"]').click();
  //   await page.keyboard.type("Test Auto");
  //   await page.locator('button:has-text("Valider")').click();
  //   // await page.pause();
  //   /****** Fin Test Mon agenda ******/
  // });

  /**
   * Rechercher un patient pour l'envoyer un message via email
   */
  // test("Contacter un patient", async ({ page }) => {
  //   await page
  //     .locator('#root li[role="menuitem"]:has-text("Patients")')
  //     .click();
  //   await page.locator('[placeholder="Rechercher"]').click();
  //   await page.locator('[placeholder="Rechercher"]').fill("Honoré Schneider");
  //   await page.locator("text=Contacter").first().click();
  //   await page.locator('[placeholder="Objet de l\\\'email"]').click();
  //   await page.keyboard.type("CICD AUTO TEST");
  //   await page
  //     .locator(
  //       "div:nth-child(3) > div:nth-child(2) > div > div > .MuiFormControl-root > .MuiOutlinedInput-root"
  //     )
  //     .click();
  //   await page.keyboard.type("CICD AUTO TEST IVEHTE");
  //   await page.locator('button:has-text("Envoyer message")').click();
  // });

  /**
   * Ajouter un nouveau patient en saisisant les données
   */
  // test("Ajout patient", async ({ page }) => {
  //   await page.goto("https://staging-ivehte-dev.madait-lab.com/patients/add");
  //   await page.locator('input[type="radio"]').first().check();
  //   await page.locator('input[type="radio"]').nth(1).check();
  //   await page.locator('[placeholder="Tapez le nom de naissance"]').click();
  //   await page.keyboard.type("TEST CI 2");
  //   await page.locator('[placeholder="Tapez le ou les prénoms"]').click();
  //   await page.keyboard.type("CD TEST 2");
  //   await page.locator('[placeholder="Toulouse"]').click();
  //   await page.keyboard.type("TEST 2");
  //   await page.locator('input[type="radio"]').nth(2).check();
  //   await page.locator('input[type="radio"]').nth(3).check();
  //   await page.locator('[placeholder="Tapez le nom de la profession"]').click();
  //   await page.keyboard.type("TEST 2");
  //   await page.locator('[placeholder="Tapez l\\\'adresse complète"]').click();
  //   await page.keyboard.type("TEST 2");
  //   await page.locator('[placeholder="Entrez le numéro téléphone"]').click();
  //   await page.keyboard.type("0330223663");
  //   await page.locator('[placeholder="Entrez l\\\'adresse mail"]').click();
  //   await page.keyboard.type("test2@gmail.com");
  //   await page.locator('button:has-text("Valider l\'inscription")').click();
  // });

  /**
   * Vérification doublon patient
   */
  // test("Vérification doublon patient", async ({ page }) => {
  //   await page.goto("https://staging-ivehte-dev.madait-lab.com/patients/add");
  //   await page.locator('input[type="radio"]').first().check();
  //   await page.locator('input[type="radio"]').nth(1).check();
  //   await page.locator('[placeholder="Tapez le nom de naissance"]').click();
  //   await page.keyboard.type("TEST CI");
  //   await page.locator('[placeholder="Tapez le ou les prénoms"]').click();
  //   await page.keyboard.type("CD TEST");
  //   await page.locator('[placeholder="Toulouse"]').click();
  //   await page.keyboard.type("TEST");
  //   await page.locator('input[type="radio"]').nth(2).check();
  //   await page.locator('input[type="radio"]').nth(3).check();
  //   await page.locator('[placeholder="Tapez le nom de la profession"]').click();
  //   await page.keyboard.type("TEST");
  //   await page.locator('[placeholder="Tapez l\\\'adresse complète"]').click();
  //   await page.keyboard.type("TEST");
  //   await page.locator('[placeholder="Entrez le numéro téléphone"]').click();
  //   await page.keyboard.type("0330223665");
  //   await page.locator('[placeholder="Entrez l\\\'adresse mail"]').click();
  //   await page.keyboard.type("test@gmail.com");
  //   await page.locator('button:has-text("Valider l\'inscription")').click();
  //   await page.locator("text=ok").click();
  // });

  /**
   * Notification
   */
  test("Notification", async ({ page }) => {
    /** Début cliquer sur icon notification */
    await page.locator("text=RFabre Élise SAA >> button").first().click();
    await page
      .locator('div[role="button"]:has-text("Sélectionner les types")')
      .click();
    await page.locator('ul[role="listbox"] >> text=Nouvel événement').click();
    // await page.pause();
    /** Fin cliquer sur icon notification */

    /** Début Annulation */
    await page.locator('[data-testid="KeyboardArrowDownIcon"]').first().click();
    await page.locator("text=Annulation").click();
    // await page.pause();
    /** Fin Annulation */

    /** Début Inscription */
    await page.locator('[data-testid="KeyboardArrowDownIcon"]').first().click();
    await page.locator("text=Inscription").click();
    // await page.pause();
    /** Fin Inscription */

    /** Début Rendez-vous */
    await page.locator('[data-testid="KeyboardArrowDownIcon"]').first().click();
    await page.locator("text=Rendez-vous").first().click();
    // await page.pause();
    /** Fin Rendez-vous */

    /** Début Atelier */
    await page.locator('[data-testid="KeyboardArrowDownIcon"]').first().click();
    await page.locator("text=Atelier").click();
    // await page.pause();
    /** Fin Atelier */

    /** Début Suppression événement */
    await page.locator('[data-testid="KeyboardArrowDownIcon"]').first().click();
    await page
      .locator('li[role="option"]:has-text("Suppression événement")')
      .click();
    // await page.pause();
    /** Fin Suppression événement */

    /** Début Changement rendez-vous */
    await page.locator('[data-testid="KeyboardArrowDownIcon"]').first().click();
    await page.locator("text=Changement rendez-vous").click();
    // await page.pause();
    /** Fin Changement rendez-vous */
  });
});
