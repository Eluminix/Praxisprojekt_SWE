const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(cors()); // Erlaube Zugriff aus allen Quellen (CORS)
app.use(bodyParser.json());

app.use((req, res, next) => {
    delete require.cache[require.resolve('./artikel.json')];
    next();
  });

  app.use((req, res, next) => {
    delete require.cache[require.resolve('./data.json')];
    next();
  });

app.get('/data', (req, res) => {
  const data = require('./data.json'); // Lade die JSON-Datei
  res.send(data); // Sende die JSON-Daten als Antwort
});

app.get('/items', (req, res) => {
    const data = require('./artikel.json'); // Lade die JSON-Datei
    res.send(data); // Sende die JSON-Daten als Antwort
  });

  app.get('/shoppinglist', (req, res) => {
    fs.readFile('./einkaufsliste.json', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
      });
  //  const data = require('./einkaufsliste.json'); // Lade die JSON-Datei
  //  res.send(data); // Sende die JSON-Daten als Antwort
  });


app.post('/data', (req, res) => {
    const newData = req.body; // Extrahieren Sie die Daten aus der Anforderung
    fs.writeFile('data.json', JSON.stringify(newData), (err) => {
      if (err) {
        
        res.status(500).send('Fehler beim Speichern der Daten.');
      } else {
        
      
      }
    });
  });

  app.delete('/data/:unit', (req, res) => {
    const unit = req.params.unit;
    fs.readFile('data.json', (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const jsonData = JSON.parse(data);
        const units = jsonData.units;
        const index = units.indexOf(unit);
        if (index > -1) {
          units.splice(index, 1);
          fs.writeFile('data.json', JSON.stringify(jsonData), err => {
            if (err) {
              console.error(err);
              res.sendStatus(500);
            } else {
              res.sendStatus(200);
            }
          });
        } else {
          res.sendStatus(404);
        }
      }
    });
  });
  

  app.post('/items', (req, res) => {
    const newItem = req.body; // Extrahieren Sie die Daten aus der Anforderung
  
    fs.readFile('artikel.json', (err, data) => {
      if (err) {
        res.status(500).send('Fehler beim Laden der Daten.');
        return;
      }
  
      const items = JSON.parse(data); // Konvertieren Sie die Daten in ein Objekt
      items.push(newItem); // Fügen Sie den neuen Eintrag hinzu
  
      fs.writeFile('artikel.json', JSON.stringify(items), (err) => {
        if (err) {
          res.status(500).send('Fehler beim Speichern der Daten.');
          return;
        }
  
        res.send('Eintrag wurde erfolgreich hinzugefügt.');
      });
    });
  });

  

  app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;
    fs.readFile('artikel.json', (err, data) => {
      if (err) {
        res.status(500).send('Fehler beim Laden der Daten.');
        return;
      }
      const items = JSON.parse(data);
      const itemIndex = items.findIndex(item => item.id === itemId);
      if (itemIndex === -1) {
        res.status(404).send('Artikel nicht gefunden.');
        return;
      }
      items[itemIndex] = updatedItem;
      fs.writeFile('artikel.json', JSON.stringify(items), (err) => {
        if (err) {
          res.status(500).send('Fehler beim Speichern der Daten.');
          return;
        }
        
      });
    });
  });


  app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile('artikel.json', (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const dataArray = JSON.parse(data);
        const newDataArray = dataArray.filter(item => item.id !== id);
        fs.writeFile('artikel.json', JSON.stringify(newDataArray), err => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });
      }
    });
  });




  app.post('/shoppinglist', (req, res) => {
    const newData = req.body; // Extrahieren Sie die Daten aus der Anforderung
    fs.writeFile('einkaufsliste.json', JSON.stringify(newData), (err) => {
      if (err) {
        
        res.status(500).send('Fehler beim Speichern der Daten.');
      } else {
      }
    });
  });

  app.delete('/shoppinglist/:id', (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile('einkaufsliste.json', (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const dataArray = JSON.parse(data);
        const newDataArray = dataArray.filter(item => item.id !== id);
        fs.writeFile('einkaufsliste.json', JSON.stringify(newDataArray), err => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });
      }
    });
  });



app.listen(3000, () => {
  console.log('Server läuft auf Port 3000');
});