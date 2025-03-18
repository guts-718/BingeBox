import { fetchFromTmdb } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
  const { query } = req.params;
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    res.status(200).json({
      success: true,
      message: "person fetched successfully",
      content: data.results,
    });
  } catch (error) {
    console.log("could not execute searchPerson");
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchMovie = async (req, res) => {};

export const searchTv = async (req, res) => {};
