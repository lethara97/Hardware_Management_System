const router = require("express").Router();
let Supplier = require("../models/Supplier.model");

router.route("/").get((req, res) => {
    Supplier.find()
        .then((Supplier) => res.json(Supplier))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const SupID = req.body.SupID;
    const Supname = req.body.Supname;
    const Amount = req.body.Amount;
    const Date = req.body.Date;
    const Contactno = req.body.Contactno;
    const Email = req.body.Email;
  

    const newSupplier = new Supplier({
        SupID,
        Supname,
        Amount,
        Date,
        Contactno,
        Email,
      
    });

    newSupplier
        .save()
        .then(() => res.json("Supplier Added!"))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Supplier.findById(req.params.id)
        .then((Supplier) => res.json(Supplier))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Supplier.findById(req.params.id)
        .then((Supplier) => {
            Supplier.SupID = req.body.SupID;
            Supplier.Supname = req.body.Supname;
            Supplier.Amount = req.body.Amount;
            Supplier.Date = req.body.Date;
            Supplier.Contactno = req.body.Contactno;
            Supplier.Email = req.body.Email;
           

            Supplier.save()
                .then(() => res.json("Supplier updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Supplier.findByIdAndDelete(req.params.id)
        .then(() => res.json("Supplier deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});


router.route("/find/:SupID").get((req, res) => {
    Supplier.find({ SupID: req.params.SupID })
        .then((Supplier) => res.json(Supplier))
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;