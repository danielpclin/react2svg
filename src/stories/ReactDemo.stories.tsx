import ReactDemo from "../components/ReactDemo";
import {ComponentMeta} from "@storybook/react";

export default {
    title: "ReactDemo",
    component: ReactDemo,
} as ComponentMeta<typeof ReactDemo>;

export const Main = () => (
    <ReactDemo/>
)
