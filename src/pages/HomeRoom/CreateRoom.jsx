import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import { useContext, useState } from "react";
import Divider from "@mui/joy/Divider";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeIcon from "@mui/icons-material/Badge";
import Button from "@mui/joy/Button";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AppContext } from "../../Context/Context";
import axios from "axios";
const CreateRoom = () => {
  const topicOption = [
    "Học văn",
    "Học toán",
    "Học tiếng Anh",
    "Học lịch sử",
    "Học địa lý",
    "Học khoa học",
    "Học sinh học",
    "Học thể dục",
    "Học mỹ thuật",
    "Học công nghệ",
    "Học tin học",
    "Học triết học",
    "Học kinh tế",
    "Học chính trị",
    "Học ngoại ngữ",
    "Học khoa học tự nhiên",
    "Học khoa học xã hội",
    "Học kỹ năng sống",
    "Học nghệ thuật",
    "Học đa ngành",
    "Học nữa học mãi",
    "Học tới mai",
    "Học 24/7",
    "Học toán tới mai",
    "Học văn suốt đêm",
    "Học không ngừng nghỉ",
    "Học tập không giới hạn",
    "Học liên tục",
    "Học liên tục 24 giờ",
    "Học không ngừng",
  ];
  const fixedOptions = [];
  const { datastate, setToastMessage, setOpenToast, setLoading, setStatusToast } =
    useContext(AppContext);
  const [roomName, setRoomName] = useState("");
  const [topic, setTopic] = useState([]);
  const [limit, setLimit] = useState(0);
  const [introduc, setIntroduc] = useState("");
  const navigate = useNavigate();
  const handleCreate = async () => {
    if (roomName === "" || limit === 0 || introduc === "") {
      console.log("Hello");
      setOpenToast(false);
      setToastMessage("Please fill all fields!");
      setStatusToast("warning");

      setOpenToast(true);
      const timer = setTimeout(() => {
        setOpenToast(false);
      }, 1700);
      return () => clearTimeout(timer);
    }
    setLoading(true);
    const data = await axios.post(
      `${import.meta.env.VITE_API_KEY}/api/room/create-room`,
      {
        name: roomName,
        topic: topic,
        limit: limit,
        intro: introduc,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${datastate.token}`,
        },
      }
    );
    setLoading(false);
    if (data.data.status === 200) {
      setOpenToast(false);
      setStatusToast("success");
      setToastMessage("Create room is success!");
      setOpenToast(true);
      const timer = setTimeout(() => {
        setOpenToast(false);
        navigate("/list-room");
      });
      return () => {
        clearTimeout(timer);
      };
    }
    if (data.data.status === 210) {
      setOpenToast(false);
      setStatusToast("warning");
      setToastMessage(data.data.message);
      setOpenToast(true);
      const timer = setTimeout(() => {
        setOpenToast(false);
      });
      return () => {
        clearTimeout(timer);
      };
    }
    if (data.data.status === 400) {
      setOpenToast(false);
      setStatusToast("error");
      setToastMessage("Create room faild!");
      setOpenToast(true);
      const timer = setTimeout(() => {
        setOpenToast(false);
      });
      return () => {
        clearTimeout(timer);
      };
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-max h-max mt-10">
        <Card
          variant="outlined"
          sx={{
            maxHeight: "max-content",
            maxWidth: "100%",
            mx: "auto",
            // to make the demo resizable
            overflow: "auto",
            resize: "horizontal",
          }}
        >
          <Typography level="title-lg" startDecorator={<AccountCircleIcon />}>
            Create room
          </Typography>
          <Divider inset="none" />
          <CardContent
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(80px, 1fr))",
              gap: 1.5,
            }}
          >
            <FormControl sx={{ gridColumn: "1/-1" }}>
              <FormLabel>Room name</FormLabel>
              <Input
                style={{ height: "57px" }}
                value={roomName}
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
                endDecorator={<BadgeIcon />}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Topic</FormLabel>
              <Autocomplete
                multiple
                id="fixed-tags-demo"
                value={topic}
                onChange={(event, newValue) => {
                  setTopic([
                    ...fixedOptions,
                    ...newValue.filter(
                      (option) => fixedOptions.indexOf(option) === -1
                    ),
                  ]);
                }}
                options={topicOption}
                getOptionLabel={(option) => option}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                      <Chip
                        key={key}
                        label={option}
                        {...tagProps}
                        disabled={fixedOptions.indexOf(option) !== -1}
                      />
                    );
                  })
                }
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Topic" />
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Limit</FormLabel>
              <Input
                style={{ height: "57px" }}
                endDecorator={<InfoOutlined />}
                value={limit}
                type="number"
                onChange={(e) => {
                  setLimit(e.target.value);
                }}
              />
            </FormControl>
            <FormControl sx={{ gridColumn: "1/-1" }}>
              <FormLabel>Introduction</FormLabel>
              <Input
                style={{ height: "57px" }}
                value={introduc}
                onChange={(e) => {
                  setIntroduc(e.target.value);
                }}
                placeholder="Hello....."
              />
            </FormControl>
            <CardActions sx={{ gridColumn: "1/-1" }}>
              <Button variant="solid" onClick={handleCreate} color="primary">
                <p className="text-lg">Create</p>
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateRoom;
