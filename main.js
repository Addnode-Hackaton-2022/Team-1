let ws;
let isConnected = false;
const delta = 3.92; // 256/65

function connect() {
  const wdu_ip = "172.16.64.133";
  ws = new WebSocket("ws://" + wdu_ip + "/ws");
  ws.onopen = function ws_open(e) {
    console.log("onopen: " + JSON.stringify(e));
    isConnected = true;
  };
  ws.onclose = function ws_close(e) {
    console.log("onclose: " + e);
    if (isConnected) {
      console.log("reconnect");
    }
    connect();
  };

  ws.onmessage = function ws_message(e) {
    // console.log("onmessage:" + e.data["messagecmd"]);
    const parsed = JSON.parse(e.data);
    // console.log("cmd: " + e.data.messagecmd);
    const alarm_level = 5;
    const tank_level = 1;
    const command = parsed.data[0];
    switch (command) {
      case alarm_level:
        switch (command) {
          case alarm_level:
            const v2 = parsed.data[5];
            const signed = parsed.data[6];

            const current =
              signed <= 0 ? Math.ceil(v2 / delta) : Math.ceil(v2 / delta) + 65;
            document.getElementById("alarm").innerText = `Alarm: ${current}`;
        }
        break;
      case tank_level:
        if (parsed.messagecmd === 5) {
          const v2 = parsed.data[5];
          const signed = parsed.data[6];

          const current =
            signed <= 0 ? Math.ceil(v2 / delta) : Math.ceil(v2 / delta) + 65;
          document.getElementById("tanklevel").innerText = `Tank: ${current}`;
        }
        break;
    }
  };

  ws.onerror = function ws_error(e) {
    // todo reconnect
    console.log("onerror: " + e);
  };
}

function disconnect() {
  isConnected = false;
  ws.close();
}

function increaseTankLevel() {
  const message = {
    data: [2, 0, 1],
    messagecmd: 1,
    messagetype: 17,
    size: 3,
  };
  const json = JSON.stringify(message);
  ws.send(json);
}
function decreaseTankLevel() {
  const message = {
    data: [3, 0, 1],
    messagecmd: 1,
    messagetype: 17,
    size: 3,
  };
  const json = JSON.stringify(message);
  ws.send(json);
  const message2 = {
    data: [3, 0, 0],
    messagecmd: 1,
    messagetype: 17,
    size: 3,
  };
  const json2 = JSON.stringify(message2);
  ws.send(json2);
}

function setAlarmLevel() {
  var el = document.getElementById("inp");
  const message = {
    data: [4, 0, 0, parseInt(el.value), 0],
    messagecmd: 3,
    messagetype: 17,
    size: 5,
  };
  const json = JSON.stringify(message);
  console.log(json);
  ws.send(json);
}
