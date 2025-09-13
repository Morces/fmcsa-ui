import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const BasicModal = ({
  isOpen,
  onClose,
  children,
  className = "w-[650px] max-md:w-full",
  title = "",
}) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`border border-white max-md:mx-3 ${className}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="max-h-[85vh] overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default BasicModal;
