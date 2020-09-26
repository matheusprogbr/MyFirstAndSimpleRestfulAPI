let data = require('../../data.json');
const fs = require("fs");

module.exports = {
  index: (req,res) => {
    res.json(data);
  },
  show: (req,res) => {
    const { id } = req.params;

    const foundClient = data.find((client) => {
      return id == client.id;
    });

    if(!foundClient) return res.status(204).send('The client does not exist');

    return res.json(foundClient);
  },
  post: (req,res) => {
    const { name, email } = req.body;
    let id = 1;

    const lastClient = data[data.length-1];

    if(lastClient){
      id = lastClient.id + 1;
    }

    data.push({
      id,
      ...req.body,
      name,
      email
    });

    fs.writeFile('src/data.json', JSON.stringify(data,null,2), (err) => {
      if(err) return res.status(500).send("Internal error");

      return res.status(201).redirect(`clients/${id}`);
    });
    
  },
  put: (req,res) => {
    let { id } = req.body;

    let index = 0;

    const foundClient = data.find((client, foundIndex) => {
      if(id == client.id){
        index = foundIndex;
        return true;
      };
    });

    if(!foundClient) return res.status(204).send('The client does not exist');

    id = Number(id);

    const newClient = {
      id,
      ...req.body
    };

    data[index] = newClient;

    fs.writeFile('src/data.json', JSON.stringify(data,null,2), (err) => {
      if(err) return res.status(500).send('Internal error!');

      return res.status(201).send(data[index]);
    });

  },
  delete: (req,res) => {
    const { id } = req.body;

    const filteredClients = data.filter((client) => {
      return id != client.id;
    });

    data = filteredClients;

    fs.writeFile('src/data.json', JSON.stringify(data,null,2), (err) => {
      if(err) return res.status(500).send('Internal error!');

      return res.status(200).json(data);
    });
  }, 
};