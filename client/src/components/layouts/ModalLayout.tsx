import { MantineRadius, Modal, ModalProps, rem } from '@mantine/core';

interface ModalLayoutProps extends Omit<ModalProps, 'opened'> {
  children: React.ReactNode;
  open: boolean;
  fit?: boolean;
  size?: ModalProps['size'];
  closeOnClickOutside?: boolean;
  centered?: boolean;
  onClose: () => void;
  radius?: MantineRadius;
  padding?: ModalProps['padding'];
}

export default function ModalLayout(props: ModalLayoutProps) {
  const {
    children,
    open,
    size,
    centered = true,
    closeOnClickOutside = true,
    onClose,
    radius,
    padding,
    ...rest
  } = props;
  return (
    <Modal
      opened={open}
      size={size ?? 500}
      onClose={onClose}
      centered={centered}
      radius={radius ?? 6}
      closeOnClickOutside={closeOnClickOutside}
      withCloseButton={false}
      padding={padding ?? rem(25)}
      {...rest}
    >
      {children}
    </Modal>
  );
}
