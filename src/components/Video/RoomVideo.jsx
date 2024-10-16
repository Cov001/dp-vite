import CardVideo from "../Card/CardVideo";

const RoomVideo = ({ number }) => {
  return (
    <div
      className={`w-full h-full grid  ${
        number == 1
          ? "grid-cols-1 grid-rows-1"
          : 1 < number && number <= 3
          ? "grid-cols-3"
          : 4 <= number && number <= 8
          ? "grid-cols-4 grid-rows-2"
          : 9 <= number && number <= 16
          ? "grid-cols-4 grid-rows-4"
          : "grid-cols-4 grid-rows-4"
      }  `}
    >
      <CardVideo />
      <CardVideo />
      <CardVideo />
      <CardVideo />
      <CardVideo />
    </div>
  );
};

export default RoomVideo;
