import User from "../models/user.model.js";
import { fetchFromTmdb } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTmdb(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      console.log("NO result found");
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "person fetched successfully",
      content: response.results,
    });
  } catch (error) {
    console.log("could not execute searchPerson");
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchMovie = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTmdb(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      console.log("NO result found");
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "movie fetched successfully",
      content: response.results,
    });
  } catch (error) {
    console.log("could not execute searchMovie");
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchTv = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTmdb(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      console.log("NO result found");
      return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "Tv show fetched successfully",
      content: response.results,
    });
  } catch (error) {
    console.log("could not execute TV Show");
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    console.log("could not load search history");
    res
      .status(500)
      .json({ success: false, message: "could not load search history" });
  }
};

export const removeItemFromSearchHistory = async (req, res) => {
  // params gives type of string
  let { id } = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });
    res.status(200).json({ success: true, message: "deleted successfully" });
  } catch (error) {
    console.log("could not remove item from history");
    res.status(500).json({
      success: false,
      message: "could not delete element from search history",
    });
  }
};
