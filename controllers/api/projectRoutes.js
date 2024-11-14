const router = require('express').Router();
const { Project } = require('../../models');
const { describe } = require('../../models/User');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//http://localhost:3001/api/projects/13
router.put('/:id', withAuth, async (req, res) => {
  console.log(req.body, req.params.id)
  // try {
    const projectData = await Project.update({
      name: req.body.name,
      description:req.body.description,
      needed_funding: parseFloat(req.body.needed_funding) 
    },{
      where: {
        id: req.params.id,
        
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

module.exports = router;
