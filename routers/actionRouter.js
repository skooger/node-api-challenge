const express = require("express");

const database = require("../data/helpers/actionModel");
const projectDatabase = require("../data/helpers/projectModel");

const router = express.Router();


router.get('/:id', validateProjectId, (req, res) => {

    const {id} = req.params;

    database.get(id)
            .then(action => {
                res.status(200).json(action);
            }).catch(err => res.status(500).json({ error: "The action information could not be retrieved." }))

})

router.post('/', (req,res) => {

    const {project_id, description, notes} = req.body;
    if(!project_id || !description || !notes){
        res.status(400).json({ error: "Please provide a project ID, description or note for the action." })
    }else{
        database.insert({project_id, description, notes})
                .then(action => {
                    res.status(201).json(action);
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
    projectDatabase.get(req.params.id)
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