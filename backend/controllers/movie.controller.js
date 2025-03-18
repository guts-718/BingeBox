import { fetchFromTmdb } from "../services/tmdb.service.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTmdb(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );

    // Ensure data.results exists and is an array with elements
    if (!data?.results || data.results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No trending movies found" });
    }

    const randomMovie =
      data.results[Math.floor(Math.random() * data.results.length)];

    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.error("Unable to fetch trending movie:", error);
    res
      .status(500)
      .json({ success: false, message: "Could not fetch trending movie" });
  }
};

export const getMovieTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    console.log("error in fetching movie trailers ", error);
    res.status(500).json({
      success: false,
      message: "error fetching movie trailers",
      error: error.message,
    });
  }
};

export const getMovieDetails = async (req, res) => {
  console.log("funtion getMovieDetails entered");
  const { id } = req.params;
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.log("could not get movie details ", error);
    res.status(500).json({
      success: false,
      message: "could not get movie details",
      error: error.message,
    });
  }
};
export const getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.log("Error in fetching similar movies ", error);
    res.status(500).json({
      success: false,
      message: "error in fetching similar movies",
      error: error.message,
    });
  }
};

export const getMovieByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("could not fetch movies based on category");
    res.status(500).json({
      success: false,
      message: "Could not fetch movie based on category",
      error: error.message,
    });
  }
};
