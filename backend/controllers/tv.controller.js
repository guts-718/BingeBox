import { fetchFromTmdb } from "../services/tmdb.service.js";

export const getTrendingTv = async (req, res) => {
  try {
    const data = await fetchFromTmdb(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
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

export const getTvTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.status(200).json({ success: true, trailers: data?.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTvDetails = async (req, res) => {
  console.log("funtion getMovieDetails entered");
  const { id } = req.params;
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );

    if (data?.results?.length === 0 || !data) {
      console.log("NO result found");
      return res.status(404).send(null);
    }
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getSimilarTv = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );

    if (data?.results?.length === 0) {
      console.log("NO result found");
      return res.status(404).send(null);
    }
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

export const getTvByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );

    if (data?.results?.length === 0) {
      console.log("NO result found");
      return res.status(404).send(null);
    }
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
