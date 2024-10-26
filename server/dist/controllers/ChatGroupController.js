import prisma from "../config/db.config.js";
class ChatGroupController {
    //for fetching groups by single user
    static async index(req, res) {
        try {
            const user = req.user;
            const groups = await prisma.chatGroup.findMany({
                where: {
                    user_id: user.id,
                },
                orderBy: {
                    created_at: "desc",
                },
            });
            return res.json({
                message: "Chat Group Fetched Succesfully",
                data: groups,
            });
        }
        catch (error) {
            return res.status(500).json({ message: "something went wrong" });
        }
    }
    //for specific group
    static async show(req, res) {
        try {
            const { id } = req.params;
            const group = await prisma.chatGroup.findUnique({
                where: { id: id },
            });
            return res.json({
                message: "Chat Group Fetched Succesfully",
                data: group,
            });
        }
        catch (error) {
            return res.status(500).json({ message: "something went wrong" });
        }
    }
    //for creating groups
    static async store(req, res) {
        try {
            const body = req.body;
            const user = req.user;
            await prisma.chatGroup.create({
                data: {
                    title: body.title,
                    passcode: body.passcode,
                    user_id: user.id,
                },
            });
            return res.json({ message: "Chat Group Created Succesfully" });
        }
        catch (error) {
            return res.status(500).json({ message: "something went wrong" });
        }
    }
    //for updating the group
    static async update(req, res) {
        try {
            const body = req.body;
            const { id } = req.params;
            await prisma.chatGroup.update({
                data: {
                    title: body.title,
                    passcode: body.passcode,
                },
                where: {
                    id: id,
                },
            });
            return res.json({ message: "Chat Group updated Succesfully" });
        }
        catch (error) {
            return res.status(500).json({ message: "something went wrong" });
        }
    }
    static async destroy(req, res) {
        try {
            const { id } = req.params;
            await prisma.chatGroup.delete({
                where: { id: id },
            });
            return res.json({
                message: "Chat Group deleted Succesfully",
            });
        }
        catch (error) {
            return res.status(500).json({ message: "something went wrong" });
        }
    }
}
export default ChatGroupController;
