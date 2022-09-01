import Layout from "../../components/UI/layout/layout";
import {
  Button,
  ButtonProps,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Row,
  Switch,
  Tooltip,
  Typography,
} from "antd";
import { memo, useEffect, useState } from "react";
import { ICard, IPackage, IPackageDeleteProps } from "../../constants/storage";
import { getPackages } from "../../storage/packages";
import styled from "@emotion/styled";
import { usePackagesStore } from "../../stores/packages";
import Icon from "../../components/UI/icon/icon";
import { Icons } from "../../constants/components/UI/icon";
import { useStorageStore } from "../../stores/storage";
import { getCards } from "../../storage/card";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useCardsStore } from "../../stores/cards";
import { ArticlesSelect } from "../../components/UI/articles_select/articles_select";
import { ArticlesSelectEnum } from "../../constants/components/UI/articles_select";

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

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > * {
    margin: 0 0.5rem;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const SubmitButtonContainer = styled(Form.Item)`
  & .ant-form-item-control-input-content {
    display: flex;
    justify-content: flex-end;
  }
`;

const CardContainer = styled(Card)`
  border-radius: 0.5rem;
`;

const CardHeadContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > *:nth-child(2) {
    margin: 0.5rem;
  }
`;

const CardContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;

  & > h2 {
    margin-right: 0.5rem;
    font-weight: 300;
  }

  & > * {
    margin-bottom: 0 !important;
    margin-top: 0 !important;
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

interface IExtendedIconEyeButton {
  isHidden: boolean;
}

type ExtendedIconEyeButton = IExtendedIconEyeButton & ButtonProps;

const IconEyeButton = styled(IconButton)<ExtendedIconEyeButton>`
  & svg * {
    ${(props) => props.isHidden && "fill: #4d9405;"}
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

const CardsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { triggered } = useStorageStore((state) => ({
    triggered: state.triggered,
  }));

  const {
    cards,
    setCards,

    addCardModalVisible,
    toggleAddCardModal,
    onAddCard,

    editCardModalVisible,
    toggleEditCardModal,
    onEditCard,
    setCurrentEditingCard,
    currentEditingCard,

    onDeleteCard,

    toggleShowMeanOfWord,
    showMeanOfWord,

    showAll,
    toggleShowAllCards,
  } = useCardsStore((state) => ({
    cards: state.cards,
    setCards: state.setCards,

    addCardModalVisible: state.addCardModalVisible,
    toggleAddCardModal: state.toggleAddCardModal,
    onAddCard: state.onAddCard,

    editCardModalVisible: state.editCardModalVisible,
    toggleEditCardModal: state.toggleEditCardModal,
    onEditCard: state.onEditCard,
    currentEditingCard: state.currentEditingCard,
    setCurrentEditingCard: state.setCurrentEditingCard,

    onDeleteCard: state.onDeleteCard,

    showMeanOfWord: state.showMeanOfWord,
    toggleShowMeanOfWord: state.toggleShowMeanOfWord,

    toggleShowAllCards: state.toggleShowAllCards,
    showAll: state.showAll,
  }));

  useEffect(() => {
    if (!id) {
      navigate(ROUTES.packages);
    }

    const requestedCards = getCards(id!);

    if (!requestedCards) {
      navigate(ROUTES.packages);
    }

    setCards(requestedCards!);
  }, [triggered]);

  const Menu = ({ cardItem }: { cardItem: ICard }) => {
    return (
      <CustomMenu
        inlineIndent={5}
        items={[
          {
            key: "1",
            label: (
              <MenuIconButton
                onClick={() => {
                  setCurrentEditingCard(cardItem);
                  toggleEditCardModal();
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
                onClick={() => onDeleteCard(cardItem)}
              >
                Delete
              </MenuIconButton>
            ),
          },
        ]}
      ></CustomMenu>
    );
  };

  return (
    <Layout>
      <Container>
        <Header>
          <h1>Cards ({cards.length})</h1>
          <HeaderButtons>
            <Button type="primary" onClick={toggleAddCardModal}>
              Add Card
            </Button>

            <Button type="primary" onClick={toggleShowAllCards}>
              {showAll ? "Hide" : "Show"} all cards
            </Button>
          </HeaderButtons>
        </Header>
        <Row gutter={[10, 10]}>
          {cards.length === 0 ? (
            <Typography.Title level={1}>
              There is no card. You can add new word card with add card button
            </Typography.Title>
          ) : (
            cards.map((card, index) => (
              <Col key={index} lg={6} md={12} sm={24} xs={24}>
                <CardContainer>
                  <CardHeadContainer>
                    <Dropdown
                      placement={"bottomRight"}
                      trigger={["click"]}
                      overlay={<Menu cardItem={card} />}
                    >
                      <IconButton
                        icon={<Icon icon={Icons.ThreeDotsVertical} />}
                        type={"link"}
                      ></IconButton>
                    </Dropdown>
                    <Tooltip placement="top" title="Show mean of the word">
                      <IconEyeButton
                        type={"link"}
                        isHidden={showMeanOfWord[index] || false}
                        onClick={() => toggleShowMeanOfWord(index)}
                        icon={<Icon icon={Icons.Eye} />}
                      ></IconEyeButton>
                    </Tooltip>
                    <Tooltip placement="top" title="Do memorized?">
                      <Switch
                        checked={card.doMemorized}
                        onChange={(value) =>
                          onEditCard({ ...card, doMemorized: value })
                        }
                      ></Switch>
                    </Tooltip>
                  </CardHeadContainer>
                  <CardContentContainer>
                    {showMeanOfWord[index] ? (
                      <Typography.Title level={1}>
                        {card.meanOfWord}
                      </Typography.Title>
                    ) : (
                      <>
                        <Typography.Title level={2}>
                          {card.article}
                        </Typography.Title>
                        <Typography.Title level={1}>
                          {card.word}
                        </Typography.Title>
                      </>
                    )}
                  </CardContentContainer>
                </CardContainer>
              </Col>
            ))
          )}
        </Row>
      </Container>

      <Modal
        title="Add Card"
        onCancel={toggleAddCardModal}
        visible={addCardModalVisible}
        footer={null}
      >
        <Form
          name="basic"
          initialValues={{ article: ArticlesSelectEnum.der }}
          onFinish={(values) => onAddCard({ ...values, cardsId: id })}
        >
          <Form.Item
            name="article"
            rules={[
              { required: true, message: "Please input article of word!" },
            ]}
          >
            <ArticlesSelect />
          </Form.Item>

          <Form.Item
            name="word"
            rules={[{ required: true, message: "Please input word!" }]}
          >
            <Input placeholder={"Word"} />
          </Form.Item>

          <Form.Item
            name="meanOfWord"
            rules={[{ required: true, message: "Please input mean of word!" }]}
          >
            <Input placeholder={"Mean of the word"} />
          </Form.Item>

          <SubmitButtonContainer>
            <Button htmlType={"submit"} type={"primary"}>
              Add
            </Button>
          </SubmitButtonContainer>
        </Form>
      </Modal>

      <Modal
        title="Edit Card"
        onCancel={toggleEditCardModal}
        visible={editCardModalVisible}
        footer={null}
        destroyOnClose
      >
        <Form
          name="basic"
          initialValues={{
            article: currentEditingCard?.article || "",
            word: currentEditingCard?.word || "",
            meanOfWord: currentEditingCard?.meanOfWord || "",
            doMemorized: currentEditingCard?.doMemorized || false,
          }}
          onFinish={(values) =>
            onEditCard({ ...currentEditingCard, ...values, cardsId: id })
          }
        >
          <Form.Item
            name="article"
            rules={[
              { required: true, message: "Please input article of word!" },
            ]}
          >
            <ArticlesSelect />
          </Form.Item>

          <Form.Item
            name="word"
            rules={[{ required: true, message: "Please input word!" }]}
          >
            <Input placeholder={"Word"} />
          </Form.Item>

          <Form.Item
            name="meanOfWord"
            rules={[{ required: true, message: "Please input mean of word!" }]}
          >
            <Input placeholder={"Mean of the word"} />
          </Form.Item>

          <Form.Item
            valuePropName="checked"
            label={"Do memorized?"}
            name="doMemorized"
          >
            <Switch></Switch>
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

export default CardsView;
