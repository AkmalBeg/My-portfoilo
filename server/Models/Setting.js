import mangoose from "mongoose";

const SettingSchema = new mangoose.Schema(
    {
        about: [
            {
              bio: { type: String, required: true }
            
            }
        ],
        projects: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
                projectLink: { type: String, required: true },
                githubLink: { type: String, required: true },
                image: { type: String, required: true }
            }
        ],
        skills: [
            {
                name: { type: String, required: true },
                proficiency: { type: String, required: true }

            }
        ]
    }
);  

    const Setting = mangoose.model("Setting", SettingSchema);
