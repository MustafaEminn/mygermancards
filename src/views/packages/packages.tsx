import Layout from "../../components/UI/layout/layout";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Row,
  Typography,
} from "antd";
import { memo, useEffect, useState } from "react";
import { IPackage, IPackageDeleteProps } from "../../constants/storage";
import { getPackages } from "../../storage/packages";
import styled from "@emotion/styled";
import { usePackagesStore } from "../../stores/packages";
import Icon from "../../components/UI/icon/icon";
import { Icons } from "../../constants/components/UI/icon";
import { useStorageStore } from "../../stores/storage";
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";

const Container = styled.div`
  & > * {
    padding: 0 2rem;
  }
`;

const CustomMenu = styled(Menu)`
  & .ant-dropdown-menu-item {
    padding: 0;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubmitButtonContainer = styled(Form.Item)`
  & .ant-form-item-control-input-content {
    display: flex;
    justify-content: flex-end;
  }
`;

const CardExtraContainer = styled.div`
  display: flex;

  & > *:first-child {
    margin-right: 0.5rem;
  }
`;

const IconButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;

  & > *:nth-child(2) {
    margin-left: 0.5rem;
  }
`;

const MenuIconButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  & > *:nth-child(2) {
    margin-left: 0.5rem;
  }
`;

const { confirm } = Modal;

const PackagesView = () => {
  const [packages, setPackages] = useState<IPackage[]>([]);

  const { triggered } = useStorageStore((state) => ({
    triggered: state.triggered,
  }));

  const {
    addPackageModalVisible,
    toggleAddPackageModal,
    onAddPackage,

    editPackageModalVisible,
    toggleEditPackageModal,
    onEditPackage,
    setCurrentEditingPackage,
    currentEditingPackage,

    onDeletePackage: onDeletePackageStore,
  } = usePackagesStore((state) => ({
    addPackageModalVisible: state.addPackageModalVisible,
    toggleAddPackageModal: state.toggleAddPackageModal,
    onAddPackage: state.onAddPackage,

    editPackageModalVisible: state.editPackageModalVisible,
    toggleEditPackageModal: state.toggleEditPackageModal,
    onEditPackage: state.onEditPackage,
    currentEditingPackage: state.currentEditingPackage,
    setCurrentEditingPackage: state.setCurrentEditingPackage,

    onDeletePackage: state.onDeletePackage,
  }));

  useEffect(() => {
    const requestedPackages = getPackages();

    if (requestedPackages) {
      setPackages(requestedPackages);
    }
  }, [triggered]);

  const onDeletePackage = (packageItem: IPackageDeleteProps) => {
    confirm({
      title: "Are you sure to delete this package?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await onDeletePackageStore(packageItem);
      },
      onCancel() {},
    });
  };

  const MemoMenu = memo(({ packageItem }: { packageItem: IPackage }) => {
    return (
      <CustomMenu
        inlineIndent={5}
        items={[
          {
            key: "1",
            label: (
              <MenuIconButton
                onClick={() => {
                  setCurrentEditingPackage(packageItem);
                  toggleEditPackageModal();
                }}
                type={"link"}
                icon={<Icon icon={Icons.Pencil} />}
              >
                Edit
              </MenuIconButton>
            ),
          },
          {
            key: "2",
            label: (
              <MenuIconButton
                icon={<Icon icon={Icons.Trash} />}
                danger
                type={"link"}
                onClick={() => onDeletePackage(packageItem)}
              >
                Delete
              </MenuIconButton>
            ),
          },
        ]}
      ></CustomMenu>
    );
  });

  return (
    <Layout>
      <Container>
        <Header>
          <h1>Packages</h1>

          <Button type="primary" onClick={toggleAddPackageModal}>
            Add Package
          </Button>
        </Header>
        <Row gutter={10}>
          {packages.length === 0 ? (
            <Typography.Title level={1}>No packages found</Typography.Title>
          ) : (
            packages.map((packageItem, index) => (
              <Col key={index} lg={6} md={12} sm={24}>
                <Card
                  key={index}
                  title={packageItem.name}
                  extra={
                    <CardExtraContainer>
                      <Dropdown
                        placement={"bottomRight"}
                        trigger={["click"]}
                        overlay={<MemoMenu packageItem={packageItem} />}
                      >
                        <IconButton
                          icon={<Icon icon={Icons.ThreeDotsVertical} />}
                          type={"link"}
                        ></IconButton>
                      </Dropdown>
                      <Link to={`${ROUTES.cards}/${packageItem.cardsId}`}>
                        <IconButton
                          icon={<Icon icon={Icons.ArrowRight} />}
                          type={"primary"}
                        ></IconButton>
                      </Link>
                    </CardExtraContainer>
                  }
                ></Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      <Modal
        title="Add Package"
        onCancel={toggleAddPackageModal}
        visible={addPackageModalVisible}
        footer={null}
      >
        <Form name="basic" onFinish={onAddPackage}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder={"Name"} />
          </Form.Item>

          <SubmitButtonContainer>
            <Button htmlType={"submit"} type={"primary"}>
              Add
            </Button>
          </SubmitButtonContainer>
        </Form>
      </Modal>

      <Modal
        title="Edit Package"
        onCancel={toggleEditPackageModal}
        visible={editPackageModalVisible}
        destroyOnClose
        footer={null}
      >
        <Form
          name="basic"
          onFinish={(values) =>
            onEditPackage({
              newName: values.name,
              currentName: currentEditingPackage!.name,
            })
          }
          initialValues={{
            name: currentEditingPackage?.name || "",
          }}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your new name!" }]}
          >
            <Input placeholder={"Name"} />
          </Form.Item>

          <SubmitButtonContainer>
            <Button htmlType={"submit"} type={"primary"}>
              Edit
            </Button>
          </SubmitButtonContainer>
        </Form>
      </Modal>
    </Layout>
  );
};

export default PackagesView;
