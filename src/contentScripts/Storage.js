import browser from "./browser";

export default class Storage {
  interventions: [];
  status: [];
  codes: [];

  load = async () => {
    await browser.storage.local.set({
      status: [
        { title: "Attente appareil non reçu", color: "35FFF8" },
        { title: "Attente facture", color: "BE814E" },
        { title: "Attente info client", color: "E8B285" },
        { title: "Attente pièce", color: "E88585" },
        { title: "Attente réponse devis", color: "FF7070" },
        { title: "Localisation", color: "7BAAAA" },
        { title: "Mail in", color: "CDCDCD" },
        { title: "Rendez-vous prévu", color: "CED0FF" },
        { title: "Réparation différée", color: "FF9965" },
        { title: "Test longue durée", color: "FFEF5E" },
        { title: "Tête trempe", color: "3E983E" },
        { title: "Vérification Apple", color: "145757" }
      ]
    });
    const datas = await browser.storage.local.get({
      interventions: [],
      status: [],
      codes: []
    });

    this.interventions = datas.interventions;
    this.status = datas.status;
    this.codes = datas.codes;

    console.log(datas);
    return datas;
  };

  save = () => {
    browser.storage.local
      .set({
        interventions: this.interventions
      })
      .then(() => {
        console.log("save() : ", this.interventions);
      });
  };

  add = inter => {
    this.interventions.push(inter);
    this.save();
  };

  edit = inter => {
    console.log("edit: ", inter);
    this.get(inter.numero);
    this.add(inter);
  };

  get = numInter => {
    console.log(
      this.interventions.filter(inter => inter.numero === numInter)[0]
    );
    return this.interventions.filter(inter => inter.numero === numInter)[0];
  };

  remove = numInter => {
    this.interventions = this.interventions.filter(
      inter => inter.numero !== numInter
    );
    console.log("remove() : ", this.interventions);
    this.save();
  };
}
