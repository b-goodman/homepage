import DragPaneController from "./DragPaneController";
import AppIconController from "./AppIconController";

export const initializeViewControllers = () => {
    new DragPaneController();
    new AppIconController();
}