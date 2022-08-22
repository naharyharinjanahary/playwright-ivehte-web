import { test, expect } from "@playwright/test";

test.describe.only("Test Ivehte Web", () => {
  /**
   * Authentification
   */
  test.beforeEach(async ({ page }) => {
    await page.goto("https://staging-ivehte-dev.madait-lab.com/login");
    /****** Début Autentification ******/
    await page
      .locator('[placeholder="Entrez votre nom d\\\'utilisateur"]')
      .click();
    await page.keyboard.type("admin@yopmail.com");
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
  test("Filtrage agenda", async ({ page }) => {
    const ongletAgenda = page.locator("text=Mon agenda").first();
    await ongletAgenda.click();

    /** Début Agenda par personnel */
    await page.locator("text=Voir l'agenda de").click();
    await page.locator("text=Eugène Barthelemy").click();
    //await page.locator("#Christiane_Morel_").check();
    await page.locator('button:has-text("Valider")').click();
    await page.pause();
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
  });

  test("Créer un évenement", async ( {page} ) => {
    /****** Début Test Créer événement ******/
    await page.goto('https://staging-ivehte-dev.madait-lab.com/dashboard');
    const ongletAgenda = page.locator("text=Mon agenda").first();
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
    // await page.keyboard.type("Arthur Mace");
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
    await page.locator("text=Barthelemy Eugène").click();
    // await page.keyboard.press("Tab");
    // await page.locator("text=Jacquot Margaret").check();
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
  })

  test("Add patient", async ({ page }) => {
    /** Début ajout patient */
    await page.goto('https://staging-ivehte-dev.madait-lab.com/patients/add');
    await page.locator('input[type="radio"]').first().check();
    await page.locator('input[type="radio"]').nth(1).check();
    await page.locator('[placeholder="Tapez le nom de naissance"]').click();
    await page.keyboard.type("TEST CI 2");
    await page.locator('[placeholder="Tapez le ou les prénoms"]').click();
    await page.keyboard.type("CD TEST 2");
    await page.locator('text=Date de naissance :​ >> [placeholder="dd\\/mm\\/yyyy"]').click();
    await page.keyboard.press('Control+a');
    await page.keyboard.type('01/04/1993');
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

  /**
   * Vérification doublon patient
   */
  test("Vérification doublon patient", async ({ page }) => {
    await page.goto('https://staging-ivehte-dev.madait-lab.com/patients/add');
    await page.locator('input[type="radio"]').first().check();
    await page.locator('input[type="radio"]').nth(1).check();
    await page.locator('[placeholder="Tapez le nom de naissance"]').click();
    await page.keyboard.type("TEST CI 2");
    await page.locator('[placeholder="Tapez le ou les prénoms"]').click();
    await page.keyboard.type("CD TEST 2");
    await page.locator('text=Date de naissance :​ >> [placeholder="dd\\/mm\\/yyyy"]').click();
    await page.keyboard.press('Control+a');
    await page.keyboard.type('01/04/1993');
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
    await page.locator("text=ok").click();
  });

  test("Contacter un patient", async ({ page }) => {
    /** Début contacter patient */
    await page.goto('https://staging-ivehte-dev.madait-lab.com/dashboard');
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
  })

  test("Modifier un patient", async( {page} ) => {
    /** Debut modifier patient */
    await page.goto('https://staging-ivehte-dev.madait-lab.com/dashboard');
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

  test.skip("Modifier observation", async( {page} ) => {
    await page.goto('https://staging-ivehte-dev.madait-lab.com/dashboard');
    await page.locator('#root ul[role="menu"] >> text=Patients').click();
    await page.locator('li[role="menuitem"]:has-text("OBSERVATIONS")').click();
    await page.locator('text=Non in omnis ad et ipsa.Psychologique').click();
    await page.locator('#MODIFIER').click();
    await page.locator('[placeholder="Renseigner le nom de l\\\'intervenant"]').click();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.locator('button:has-text("VALIDER L\\\'OBSERVATION")').click();
  })

  test("Ajout HDJ", async( {page} ) => {
    await page.goto('https://staging-ivehte-dev.madait-lab.com/hdj/new');
    await page.locator('[placeholder="Tapez le nom de l\\\'HDJ"]').click();
    await page.keyboard.type("TEST CICD");
    // await page.locator('.MuiGrid-root > .MuiInputBase-root').click();
    // await page.keyboard.press("ArrowDown");
    // await page.keyboard.press("Enter");
    await page.locator('button:has-text("Enregistrer l\'HDJ")').click();
  })

  test("Modifier un HDJ", async( {page} ) => {
    await page.goto('https://staging-ivehte-dev.madait-lab.com/hdj');
    await page.locator('[placeholder="Rechercher une HDJ"]').click();
    await page.keyboard.type("HDJ");
    // await page.pause();
    // await expect(page).toHaveTitle(/Gestion de l\'HDJ/);
    await page.locator('[data-testid="KeyboardArrowDownIcon"]').click();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Escape")
    await page.locator('text=Gestion de l\'HDJ').first().click();
    await page.locator('button:has-text("Modifier")').click();
    await page.locator('[placeholder="Tapez le nom de l\\\'HDJ"]').click();
    await page.keyboard.press('Control+a');
    await page.keyboard.type("TEST CICD IVEHTE");
    await page.locator('button:has-text("Enregistrer l\'HDJ")').click();
  })

  test.skip("Créer un programme", async( {page} ) => {
    await page.goto('https://staging-ivehte-dev.madait-lab.com/dashboard');
    await page.locator('#root >> text=Programmes').click();
    await page.locator('button:has-text("créer un nouveau programme")').click();
    await page.locator('text=Cliquer pour modifier l\'icône.Sélectionnez un niveau >> [data-testid="KeyboardArrowDownIcon"]').click();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.locator('[placeholder="Tapez le nom du programme"]').click();
    await page.keyboard.type("TEST CICD");
    await page.locator('text=Pathologie :Sélectionnez une pathologie >> [data-testid="KeyboardArrowDownIcon"]').click();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");
    await page.locator('text=Date de début :​ >> [placeholder="dd\\/mm\\/yyyy"]').click();
    await page.keyboard.press('Control+a');
    await page.keyboard.type('01/09/2022');
    await page.locator('text=Date Fin :​ >> [placeholder="dd\\/mm\\/yyyy"]').click();
    await page.keyboard.press('Control+a');
    await page.keyboard.type('03/09/2022');
    await page.locator('#Atelier_7__Et_ex__').check();
    await page.locator('text=Roger Gérard').click()
    await page.locator('button:has-text("Valider le programme")').click();
  })

  test.skip("Modifier un programme", async( { page } ) => {
    await page.goto('https://staging-ivehte-dev.madait-lab.com/programmes');
    await page.locator('text=GESTION DU PROGRAMME').first().click();
    await page.locator('button:has-text("Modifier le programme")').click();
    await page.locator('[placeholder="Tapez le nom du programme"]').click();
    await page.keyboard.press('Control+a');
    await page.keyboard.type('TEST CICD IVEHTE');
    await page.locator('button:has-text("Enregistrer les modifications")').click();
  })

  test("Filtrage programme", async ({ page }) => {
    await page.goto('https://staging-ivehte-dev.madait-lab.com/programmes');
    await page.locator('text=Pathologie :Obésité >> input[type="checkbox"]').check();
    await page.locator('text=Pathologie :Obésité >> input[type="checkbox"]').uncheck();
    await page.locator('#Suivi').check();
    await page.locator('#Suivi').uncheck();
    await page.locator('#Renforcement').check();
    await page.locator('#Renforcement').uncheck();
    await page.locator('input[type="radio"]').nth(1).check();
    await page.locator('input[type="radio"]').first().check();
  });
});
