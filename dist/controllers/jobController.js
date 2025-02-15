"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.getJob = exports.getAllJob = exports.createJob = void 0;
const jobModel_1 = require("../models/jobModel");
const responseHandler_1 = require("../utils/responseHandler");
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobTitle, jobDescription, screeningQuestions, locationType, country, countryCode, state, } = req.body;
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const allowedLocationTypes = ["Remote", "On-site", "Hybrid"];
        if (!allowedLocationTypes.includes(locationType)) {
            res.status(400).json({
                message: "Invalid locationType. Use 'Remote', 'On-site', or 'Hybrid'.",
            });
            return;
        }
        if (!country || !countryCode || !state) {
            res
                .status(400)
                .json({ message: "Country, countryCode, and state are required." });
            return;
        }
        const job = new jobModel_1.Job({
            user: req.user.id,
            jobTitle,
            jobDescription,
            screeningQuestions,
            locationType,
            country,
            countryCode,
            state,
        });
        yield job.save();
        res.status(201).json((0, responseHandler_1.successResponse)("Job created successfully", job));
        return;
    }
    catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json((0, responseHandler_1.errorResponse)("Internal Server Error"));
        return;
    }
});
exports.createJob = createJob;
const getAllJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json((0, responseHandler_1.errorResponse)("Unauthorized"));
            return;
        }
        const jobs = yield jobModel_1.Job.find({ user: req.user.id }).populate("user", "firstName surname email");
        res.json((0, responseHandler_1.successResponse)("All jobs retrieved successfully", jobs));
    }
    catch (error) {
        console.log("Error retrieving jobs", error);
        res.status(500).json((0, responseHandler_1.errorResponse)("Internal Server Error"));
    }
});
exports.getAllJob = getAllJob;
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(400).json((0, responseHandler_1.errorResponse)("Unauthorized"));
            return;
        }
        const job = yield jobModel_1.Job.findOne({
            _id: req.params.id,
            user: req.user.id,
        });
        if (!job) {
            res.status(400).json((0, responseHandler_1.errorResponse)("Job not found or Unauthorized"));
            return;
        }
        res.json((0, responseHandler_1.successResponse)("Job retrieved successfully", job));
    }
    catch (error) {
        console.log("Error getting job", error);
        res.status(500).json((0, responseHandler_1.errorResponse)("Internal Server Error"));
    }
});
exports.getJob = getJob;
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json((0, responseHandler_1.errorResponse)("Unauthorized"));
            return;
        }
        const job = yield jobModel_1.Job.findOneAndUpdate({
            _id: req.params.id,
            user: req.user.id,
        }, { $set: req.body }, { new: true, runValidators: true });
        if (!job) {
            res.status(404).json((0, responseHandler_1.errorResponse)("Ticket not found or unauthorized"));
        }
        res.json((0, responseHandler_1.successResponse)("Job Updated Successfully", job));
        return;
    }
    catch (error) {
        console.log("Error Updating Job", error);
        res.status(500).json((0, responseHandler_1.errorResponse)("Internal Server Error"));
    }
});
exports.updateJob = updateJob;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json((0, responseHandler_1.errorResponse)("Unauthorized"));
            return;
        }
        const job = yield jobModel_1.Job.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });
        if (!job) {
            res.status(404).json((0, responseHandler_1.errorResponse)("Job not found or unauthorized"));
        }
        res.status(200).json((0, responseHandler_1.successResponse)("Job Deleted Successfully"));
    }
    catch (error) {
        console.log("Error deleteing Job", error);
        res.status(500).json((0, responseHandler_1.errorResponse)("Internal Server Error"));
        return;
    }
});
exports.deleteJob = deleteJob;
