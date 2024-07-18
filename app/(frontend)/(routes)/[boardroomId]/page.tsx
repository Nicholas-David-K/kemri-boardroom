import BoardroomInfo from "@/components/boardroom-info";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import WidthWrapper from "@/components/width-wrapper";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";

interface BoardroomDetailPage {
  params: {
    boardroomId: string;
  };
}

const BoardroomDetailPage = async ({ params }: BoardroomDetailPage) => {
  const boardroom = await db.boardroom.findUnique({
    where: {
      id: params.boardroomId,
    },
    include: {
      images: true,
    },
  });
  return (
    <div>
      <Header
        heading={boardroom?.name || "Details Page"}
        subtitle={`KEMRI ${
          boardroom?.location === "Nairobi"
            ? "Headquarters"
            : boardroom?.location
        }`}
      />
      <WidthWrapper>
        <BoardroomInfo data={boardroom} />
      </WidthWrapper>
    </div>
  );
};

export default BoardroomDetailPage;
