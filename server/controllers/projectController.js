  import Project from "../models/Project.js";

  export const createProject = async (req, res) => {
    try {
      const { title, originalImage, currentPrompt, versions } = req.body;
      const project = await Project.create({
        userId: req.userId,
        title,
        originalImage,
        currentPrompt,
        versions: versions || [],
      });
      res.status(201).json({
        message: "Project created successfully",
        project,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to create project",
      });
    }
  };

  export const getProjects = async (req, res) => {
    try {
    const projects = await Project.find({
        userId: req.userId,
      }).sort({ createdAt: -1 });
      res.status(200).json({
        projects,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Failed to get projects",
      });
    }
  };
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findOneAndDelete({
            _id: id,
            userId: req.userId,
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        res.status(200).json({
            message: "Project deleted successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete project",
        });
    }
};
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        res.status(200).json({
            project,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to get project",
        });
    }
};



export const addVersion = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { image, prompt } = req.body;

        if (!image || !prompt) {
            return res.status(400).json({
                message: "Image and prompt are required",
            });
        }

        const project = await Project.findOne({
            _id: projectId,
            userId: req.userId,
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        const newVersion = {
            image,
            prompt,
            createdAt: new Date(),
        };

        project.versions.push(newVersion);

        await project.save();

        res.status(201).json({
            message: "Version added successfully",
            version: project.versions[project.versions.length - 1],
            project,
        });

    } catch (error) {
        console.error("ADD VERSION ERROR:", error);

        res.status(500).json({
            message: "Failed to add version",
        });
    }
};



