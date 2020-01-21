import DragPaneController from "./DragPaneController";
import AppIconController from "./AppIconController";
import HeaderClockController from "./HeaderClockController";

export const initializeViewControllers = () => {
    new DragPaneController();
    new AppIconController();
    new HeaderClockController();
}