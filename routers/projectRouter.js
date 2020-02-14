const express = require("express");

const database = require("../data/helpers/projectModel");

const router = express.Router();

router.get('/:id', validateProjectId, (req, res) => {

    const {id} = req.params;

    database.get(id)
            .then(project => {
                res.status(200).json(project);
            }).catch(err => res.status(500).json({ error: "The project information could not be retrieved." }))

})

router.get('/:id/actions', validateProjectId, (req, res) => {

    const {id} = req.params;

    database.getProjectActions(id)
            .then(project => {
                res.status(200).json(project);
            }).catch(err => res.status(500).json({ error: "The project information could not be retrieved." }))

})

router.post('/', (req,res) => {

    const {name, description} = req.body;
    if(!name || !description){
        res.status(400).json({ error: "Please provide name and description for the post." })
    }else{
        database.insert({name,description})
                .then(project => {
                    res.status(201).json(project);
                }).catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))
    }
})

router.delete('/:id', validateProjectId, (req,res) => {
    const {id} = req.params;

    database.remove(id)
            .then(project => {
                res.status(200).json(project);
            }).catch(err => res.status(500).json({error: "Could not delete the project."}))
})

router.put('/:id', validateProjectId, (req,res) => {
    const {id} = req.params;

    database.update(id, req.body)
            .then(project => {
                res.status(200).json(project);
            }).catch(err => res.status(500).json({error: "Could not delete the project."}))
})




function validateProjectId(req, res, next){
    database.get(req.params.id)
            .then(project => {
                if(project === null)
                {
                    res.status(400).json({error: "Invalid project ID"})
                }else{
                    req.project = project;
                    next();
                }
            }).catch(err => res.status(500).json({error: "Could not get project."}))
}

module.exports = router;
