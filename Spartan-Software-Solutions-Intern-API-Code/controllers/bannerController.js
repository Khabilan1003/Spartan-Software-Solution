const Banner = require("../models/bannerSchema");

async function addNewBanner(request, response) {
  try {
    // Access form data
    const {
      title,
      url,
      priority,
      bannerImage,
      bannerType,
      startDate,
      endDate,
    } = request.body;

    if (
      !(
        title &&
        url &&
        priority &&
        bannerImage &&
        bannerType &&
        startDate &&
        endDate
      )
    ) {
      return response
        .status(402)
        .send({ message: "Check correct input fields" });
    }

    // Save the form data and image data to MongoDB
    const newBanner = new Banner({
      title: title,
      url: url,
      bannerImage: bannerImage,
      priority: priority,
      bannerType: bannerType,
      startDate: startDate,
      endDate: endDate,
    });
    await newBanner.save();

    return response
      .status(200)
      .json({ message: "Form data and image saved successfully" });
  } catch (error) {
    return response.status(500).json({ error: "Internal server error" });
  }
}

async function getBanners(request, response) {
  try {
    let query = { $and: [] };
    let { sort, status, bannerType, priority } = request.query;

    let sortQuery = {};

    if (sort != undefined)
      sortQuery =
        sort.toLowerCase() === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    status = status != undefined ? status.split(",") : [];
    bannerType = bannerType != undefined ? bannerType.split(",") : [];
    priority = priority != undefined ? priority.split(",") : [];

    let priorityQuery = {
      $or: [],
    };
    for (let i = 0; i < priority.length; i++) {
      priorityQuery["$or"].push({
        priority: priority[i].toLowerCase(),
      });
    }

    let bannerTypeQuery = {
      $or: [],
    };
    for (let i = 0; i < bannerType.length; i++) {
      bannerTypeQuery.$or.push({
        bannerType: bannerType[i].toLowerCase(),
      });
    }

    let statusQuery = {
      $or: [],
    };
    for (let i = 0; i < status.length; i++) {
      if (status[i].split(" ")[0].toLowerCase() === "ongoing") {
        statusQuery.$or.push({
          startDate: { $lte: new Date() },
          endDate: { $gte: new Date() },
        });
      } else if (status[i].split(" ")[0].toLowerCase() === "completed") {
        statusQuery.$or.push({
          endDate: { $lte: new Date() },
        });
      } else if (status[i].split(" ")[0].toLowerCase() === "upcoming") {
        statusQuery.$or.push({
          startDate: { $gte: new Date() },
        });
      }
    }

    if (priorityQuery.$or.length !== 0) query.$and.push(priorityQuery);
    if (bannerTypeQuery.$or.length !== 0) query.$and.push(bannerTypeQuery);
    if (statusQuery.$or.length !== 0) query.$and.push(statusQuery);
    if (query.$and.length === 0) query = {};

    const banners = await Banner.find(query).sort(sortQuery);

    if (banners) return response.json(banners);
    return response.json([]);
  } catch (error) {
    response
      .status(500)
      .json({ error: "Internal server error", message: error });
  }
}

module.exports = {
  addNewBanner,
  getBanners,
};
