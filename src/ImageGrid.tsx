import { useRef, useState } from "react";
import { users } from "./utils/generateMockData";
import clsx from "clsx";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ImageGridProps {
  users: typeof users;
  setUsers: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        image: string;
      }[]
    >
  >;
}

const Images = ({ image, id }: { image: string; id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="w-[130px] cursor-move rounded-md"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img src={image} width={130} className="rounded-md" />
    </div>
  );
};

const ImageGrid = ({ users, setUsers }: ImageGridProps) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setUsers((prev) => {
        const selectedIndex = prev.findIndex((item) => item.id === active.id);
        const replacedIndex = prev.findIndex((item) => item.id === over?.id);
        const newUsers = [...prev];
        newUsers.splice(selectedIndex, 1);
        newUsers.splice(replacedIndex, 0, prev[selectedIndex]);
        return newUsers;
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <SortableContext items={users} strategy={horizontalListSortingStrategy}>
        {users.map((item) => (
          <Images image={item.image} id={item.id} key={item.id} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default ImageGrid;
