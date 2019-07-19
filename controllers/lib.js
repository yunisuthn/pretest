const User = require('../schema/schemaUser.js');
const passwordHash = require("password-hash");
const Article = require('../schema/article');
const Banque = require('../schema/banque');

var front = []
const fs = require("fs");
exports.signup = (req, res) => {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.find()
            .then(users => {
                //res.send(notes);//autoincrement
                var idautom
                if (users.length == 0) {
                    idautom = 0
                } else {
                    idautom = parseInt(users[users.length - 1]._id) + 1
                }
                console.log('user==', idautom);
            
        var user = {
            _id: idautom,
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
        }
        var findUser = new Promise(function (resolve, reject) {
            User.findOne({
                email: user.email
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        })

        findUser.then(function () {
            var _u = new User(user);
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                    res.status(200).json({
                        "text": "Succès",
                        "token": user.getToken(),
                        "id": user._id
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'adresse email existe déjà"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'some error'
        });
    });
    }
}


exports.login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            } else if (!user) {
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            } else {
                if (user.authenticate(req.body.password)) {
                    console.log('front  ==== ', front);
                    
                    res.status(200).json({
                        "token": user.getToken(),
                        "text": "Authentification réussi",
                        'id' : user._id
                    })
                } else {
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
                    })
                }
            }
        })
    }
}

exports.createArt = (req, res) => {
    if (!req.body.nom || !req.body.prix) {
        console.log('console.log 1 ' + req.file);

        console.log('console.log 2 ' + req.body.nom);


        return res.status(400).send({
            message: "profil content can not be empty"

        });
    }

    Article.find()
        .then(user => {
            //autoincrement
            let idautom;
            if (user.length == 0) {
                idautom = 0
            } else {
                idautom = parseInt(user[user.length - 1]._id) + 1
            }

            // //images
            let imageFile = req.files.photo_profil;
            console.log('inona ny ato o!'+imageFile)
            let nomImage = idautom
            res.setHeader('Content-Type', 'text/plain');

            imageFile.mv(`${__dirname}/public/${nomImage}.jpg`, function (err) {
                if (err) {
                    return res.status(200).send(err);
                }
            });
            const profil = new Article({

                _id: idautom,
                user: req.body.user,
                nom: req.body.nom,
                prix: req.body.prix,
                description: req.body.description,
                photo_profil: '' + nomImage + '.jpg'
            });

            // bcrypt.genSalt((err, salt) => {
            //     bcrypt.hash(profil.password, salt, (err, hash) => {
            //         if (err) throw err;
            //         profil.password = hash;
            //         profil
            //             .save()
            //     })
            // })

            // Save p in the database
            profil.save()
                .then(() => {
                    Article.find()
                        .then(data => {
                            res.send(data);
                        })
                }).catch(err => {
                    res.status(200).send({
                        message: err.message || "Something wrong while creating the profil."

                    });
                });
        })
};
//On exporte nos deux fonctions

exports.findUser = (req, res) => {
    User.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'some error'
            });
        });
};
exports.findArt = (req, res) => {
    Article.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'some error'
            });
        });
};
exports.findOneArt = (req, res) => {
    Article.findById(req.params.profilId)
    .then(profilchoix => {
        if(!profilchoix) {
            return res.status(404).send({
                message: "profil not found with id" + req.params.profilId
            });            
        }
        else{  
            res.send(profilchoix);             
        }
        
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "profil not found with id " + req.params.profilId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving profil with id " + req.params.profilId
        });
    });
};

exports.findUserArt = (req, res) => {
    var data =[]
    Article.find()
        .then(notes => {
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].user == req.params.noteId) {
                   data.push(notes[i]);
                }
            }
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'some error'
            });
        });
};


exports.findOneUser = (req, res) => {
    User.findById(req.params.profilId)
    .then(profilchoix => {
        if(!profilchoix) {
            return res.status(404).send({
                message: "profil not found with id" + req.params.profilId
            });            
        }
        else{  
            res.send(profilchoix);             
        }
        
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "profil not found with id " + req.params.profilId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving profil with id " + req.params.profilId
        });
    });
};
exports.lireImage =(req, res) =>{
    try {
        let picture = fs.readFileSync('./controllers/public/'+req.params.photo_profil)
        console.log('req.params.photo_profil',req.params.photo_profil);
        
        res.write(picture)
        res.end()
    } catch (e) {
        console.log("erreur be miitsy", e.stack);
    }
}


exports.createBanque = (req, res) => {
    if (!req.body.nom || !req.body.email) {
        console.log('console.log 1 ' + req.file);

        console.log('console.log 2 ' + req.body.nom);


        return res.status(400).send({
            message: "profil content can not be empty"

        });
    }

    Banque.find()
        .then(user => {
            //autoincrement
            let idautom;
            if (user.length == 0) {
                idautom = 0
            } else {
                idautom = parseInt(user[user.length - 1]._id) + 1
            }

            const profil = new Banque({

                _id: idautom,
                nom: req.body.nom,
                email: req.body.email,
                num: req.body.num,
                argent: req.body.argent,
                password: passwordHash.generate(req.body.password)
            });

            profil.save()
                .then(() => {
                    Banque.find()
                        .then(data => {
                            res.send(data);
                        })
                }).catch(err => {
                    res.status(200).send({
                        message: err.message || "Something wrong while creating the banque."

                    });
                });
        })
};


exports.findBanque = (req, res) => {
    Banque.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'some error'
            });
        });
};
exports.achat = (req, res) => {
    if (!req.body.num && !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        Banque.findOne({
            num: req.body.num
        }, function (err, user) {
            for (let i = 0; i < user.length; i++) {
                var rest = user.argent.Decimal128 >=req.body.achat
                if ((user.num == req.body.num) && (user.argent.Decimal128 >=req.body.achat)) {
                    
                    res.status(200).json({
                        "text": "Achat réussi",
                        'id' : user._id,
                        'rest' : rest
                    })
                    console.log('rest == ', rest);
                }else{

                    res.status(401).json({
                        "text": "Achat echec"
                    })
                    console.log('Achat echec');
                }
                
            }
            
        })
    }
};


/* exports.findOneArt = (req, res) => {
    let id = req.params.profilId;
    Article.findById(id, function (err, business) {
        res.json(business);
    });
}; */


exports.update = (req, res) => {
    // Validate Request
    if (!req.body.article) {
        return res.status(400).send({
            message: "article content can not be empty"
        });
    }
    // Find note and update it with the request body
    Article.findByIdAndUpdate(req.params.noteId, {
        article: req.body.article || "Untitled Note"
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
}

exports.delete = (req, res) => {
    Article.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
}


/* exports.createArt = (req, res) => {
    if(!req.body.article) {
        return res.status(400).send({
            message: "req.body.articles"
        })
    }
    var compt = 0;
    var id = 0;
    Article.find()
    .then(elev => {
        // res.send(eleve);
        for (let i = 0; i < elev.length; i++) {
            if (elev[i]._id>compt) {
                compt = elev[i]._id
            }
        }
        console.log(compt);
        // id = compt;
        // console.log('eleve', eleve._id);

        const eleve = new Article({
            _id: compt+1,
            article: req.body.article
        })

        eleve.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error"
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'some error'
        });
    });
}; */


/* exports.signup = (req, res) => {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var user = {
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
        }
        var findUser = new Promise(function (resolve, reject) {
            User.findOne({
                email: user.email
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        })

        findUser.then(function () {
            var _u = new User(user);
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                    res.status(200).json({
                        "text": "Succès",
                        "token": user.getToken()
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'adresse email existe déjà"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
}
 */