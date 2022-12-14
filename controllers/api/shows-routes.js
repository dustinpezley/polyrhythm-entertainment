const { Op } = require('sequelize');
const router = require('express').Router();
const { Venue, Talent } = require('../../models');
const Shows = require('../../models/Shows');
const withAuth = require('../../utils/auth');

// Get all shows
router.get('/', (req, res) => {
  Shows.findAll({
    attributes: ['performance_date', 'performance_time'],
    order: [['performance_date'], ['performance_time']],
    include: [
      {
        model: Venue,
        attributes: ['name', 'address', 'capacity'],
      },
      {
        model: Talent,
        attributes: ['title'],
      },
    ],
  })
    .then((dbShowsData) => res.json(dbShowsData))
    .catch((err) => res.status(500).json(err));
});

router.get('/', (req, res) => {
  // get all shows by venue
  const currentDate = new Date().toISOString().split('T')[0];
  Shows.findOne({
    where: {
      [Op.and]: [
        { venue_id: 2 },
        // {
        //   performance_date: {
        //     [Op.gte]: currentDate,
        //   },
        // },
      ],
    },
    attributes: [
      'performance_date',
      'performance_time',
      'id',
      'talent_id',
      'venue_id',
    ],
    order: [['performance_date'], ['performance_time']],
    include: [
      {
        model: Venue,
        attributes: ['name', 'address', 'capacity'],
      },
      {
        model: Talent,
        attributes: ['title'],
      },
    ],
  })
    .then((dbShowsData) => res.json(dbShowsData))
    .catch((err) => res.status(500).json(err));
});

// Get one show
router.get('/:id', (req, res) => {
  Shows.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['performance_date', 'performance_time'],
    include: [
      {
        model: Venue,
        attributes: ['name', 'address', 'amentities'],
      },
      {
        model: Talent,
        attributes: ['title'],
      },
    ],
  })
    .then((dbShowsData) => {
      if (!dbShowsData) {
        res.status(404).json({ message: 'Show not found' });
      }
      res.json(dbShowsData);
    })
    .catch((err) => res.status(500).json(err));
});

// Add show
router.post('/', (req, res) => {
  Shows.create({
    talent_id: req.body.talent_id,
    performance_date: req.body.performance_date,
    performance_time: req.body.performance_time,
    venue_id: req.body.venue_id,
  })
    .then((dbShowsData) => res.json(dbShowsData))
    .catch((err) => res.status(500).json(err));
});

// Update show
router.put('/:id', (req, res) => {
  Shows.update(
    {
      talent_id: req.body.talent_id,
      performance_date: req.body.performance_date,
      performance_time: req.body.performance_time,
      venue_id: req.body.venue_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbShowsData) => {
      if (!dbShowsData) {
        res.status(404).json({ message: 'Show not found' });
      }
      res.json(dbShowsData);
    })
    .catch((err) => res.status(500).json(err));
});

// Delete show
router.delete('/:id', (req, res) => {
  Shows.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbShowsData) => {
      if (!dbShowsData) {
        res.status(404).json({ message: 'Show not found' });
      }
      res.json(dbShowsData);
    })
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
