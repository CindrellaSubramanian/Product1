const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Coverage=require('../schema/coverage')
const translate = require('../lib/js/translate');

// Create a new Coverage
router.post('/create', async (req, res) => {
  try {
    const newCoverage = new Coverage(req.body);
    await newCoverage.save();
    const successMessage = translate('Coverage created successfully', req.query.lang, req.query.currency);
    res.status(201).json({
      status: 1,
      message: successMessage,
      data: newCoverage,
    });
  } catch (error) {
    const errorMessage = translate('Internal server error', req.query.lang, req.query.currency);
    res.status(500).json({
      status: -1,
      message: errorMessage,
      data: null,
    });
  }
});

// List all Coverages
router.get('/list', async (req, res) => {
  try {
    const coverages = await Coverage.find();
    const successMessage = translate('Coverages retrieved successfully', req.query.lang, req.query.currency);
    res.status(200).json({
      status: 1,
      message: successMessage,
      data: coverages,
    });
  } catch (error) {
    const errorMessage = translate('Internal server error', req.query.lang, req.query.currency);
    res.status(500).json({
      status: -1,
      message: errorMessage,
      data: [],
    });
  }
});


// Get a Coverage by ID
router.get('/getById', async (req, res) => {
    try {
      const coverageId = req.query.coverageId;
      const coverage = await Coverage.findById(coverageId);
  
      if (!coverage) {
        const errorMessage = translate('Coverage not found', req.query.lang, req.query.currency);
        return res.status(404).json({
          status: -1,
          message: errorMessage,
          data: null,
        });
      }
  
      const successMessage = translate('Coverage retrieved successfully', req.query.lang, req.query.currency);
      res.status(200).json({
        status: 1,
        message: successMessage,
        data: coverage,
      });
    } catch (error) {
      const errorMessage = translate('Internal server error', req.query.lang, req.query.currency);
      res.status(500).json({
        status: -1,
        message: errorMessage,
        data: null,
      });
    }
  });

// Update a Coverage by ID
router.post('/update', async (req, res) => {
  try {
    const coverageId = req.body.coverageId;
    const updatedCoverage = await Coverage.findByIdAndUpdate(coverageId, req.body, { new: true });

    if (!updatedCoverage) {
      const errorMessage = translate('Coverage not found', req.query.lang, req.query.currency);
      return res.status(404).json({
        status: -1,
        message: errorMessage,
        data: null,
      });
    }

    const successMessage = translate('Coverage updated successfully', req.query.lang, req.query.currency);
    res.status(200).json({
      status: 1,
      message: successMessage,
      data: updatedCoverage,
    });
  } catch (error) {
    const errorMessage = translate('Internal server error', req.query.lang, req.query.currency);
    res.status(500).json({
      status: -1,
      message: errorMessage,
      data: null,
    });
  }
});

// Delete a Coverage by ID
router.delete('/delete', async (req, res) => {
  try {
    const coverageId = req.body.coverageId;
    const deletedCoverage = await Coverage.findByIdAndRemove(coverageId);

    if (!deletedCoverage) {
      const errorMessage = translate('Coverage not found', req.query.lang, req.query.currency);
      return res.status(404).json({
        status: -1,
        message: errorMessage,
        data: null,
      });
    }

    const successMessage = translate('Coverage deleted successfully', req.query.lang, req.query.currency);
    res.status(200).json({
      status: 1,
      message: successMessage,
      data: deletedCoverage,
    });
  } catch (error) {
    const errorMessage = translate('Internal server error', req.query.lang, req.query.currency);
    res.status(500).json({
      status: -1,
      message: errorMessage,
      data: null,
    });
  }
});


module.exports = router;
