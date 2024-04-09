export interface IConversation {
    id: number;
    sender: {
      id: number;
      name: string;
      image: string;
    };
    receiver: {
      id: number;
      name: string;
      image: string;
    };
    message: string;
    time: string;
  }