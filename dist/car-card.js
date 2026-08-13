/*
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : 
 * @Date          : 2020-10-17 00:28:10
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-11-02 07:44:07
 */
console.info("%c car Card \n%c  Version  2.0 ", "color: orange; font-weight: bold; background: black", "color: white; font-weight: bold; background: dimgray");
import 'https://webapi.amap.com/loader.js';

const preloadCard = type => window.loadCardHelpers()
.then(({ createCardElement }) => createCardElement({type}));
const LitElement = Object.getPrototypeOf(
    customElements.get("ha-panel-lovelace")
  );
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

// UI 文案 (中/英)
const UI_STRINGS = {
    zh: {
        entity: "设备位置 / 历史轨迹数据源",
        aspect_ratio: "宽高比",
        traffic: "实时路况",
        dark_mode: "地图样式",
        key: "高德地图 API KEY",
        securityJsCode: "高德安全密钥 (securityJsCode)",
        status_sensors: "状态传感器 (1~7 个, 从中间向两侧排列)",
        right_main_sensor: "右主传感器",
        left_main_sensor: "左主传感器",
        sub_sensor_1: "第一子传感器",
        sub_sensor_2: "第二子传感器",
        energy_value_sensor: "能耗值传感器",
        energy_percent_sensor: "能耗百分比传感器 (单位必须为 %, 驱动位条)",
        vehicle_status_sensor: "车辆状态传感器 (ON/OFF 驱动仪表盘发光)",
        update_button: "更新数据按钮实体 (单卡片显示时自动按下)",
        gps_update_button: "GPS 定位刷新按钮实体 (单卡片显示时自动按下)",
        gauge_left: "左仪表盘",
        gauge_right: "右仪表盘",
        door: "车门车窗",
        belt: "安全带/轮胎",
        other: "其他配置",
        map_style_normal: "白天模式",
        map_style_dark: "夜间模式",
        map_style_auto: "跟随主题",
        err_entity: "请选择设备位置 / 历史轨迹数据源实体 (entity)",
        reset_focus: "重置视图",
        left_front_door: "左前车门",
        left_rear_door: "左后车门",
        right_front_door: "右前车门",
        right_rear_door: "右后车门",
        left_front_door_lock: "左前门锁",
        left_rear_door_lock: "左后门锁",
        right_front_door_lock: "右前门锁",
        right_rear_door_lock: "右后门锁",
        left_front_window: "左前车窗状态",
        left_rear_window: "左后车窗状态",
        right_front_window: "右前车窗状态",
        right_rear_window: "右后车窗状态",
        sunroof_status: "天窗状态",
        engine_hood_status: "引擎盖状态",
        trunk_status: "后备箱状态",
        left_front_tyre_warning: "左前轮胎报警",
        left_rear_tyre_warning: "左后轮胎报警",
        right_front_tyre_warning: "右前轮胎报警",
        right_rear_tyre_warning: "右后轮胎报警",
        left_front_seat_belt: "左前安全带",
        left_rear_seat_belt: "左后安全带",
        right_front_seat_belt: "右前安全带",
        right_rear_seat_belt: "右后安全带",
        direction: "行驶方向 (°)"
    },
    en: {
        entity: "Location / History entity",
        aspect_ratio: "Aspect ratio",
        traffic: "Traffic",
        dark_mode: "Map style",
        key: "AMap API KEY",
        securityJsCode: "AMap security code (securityJsCode)",
        status_sensors: "Status sensors (1~7, center to sides)",
        right_main_sensor: "Right gauge main sensor",
        left_main_sensor: "Left gauge main sensor",
        sub_sensor_1: "Sub sensor 1",
        sub_sensor_2: "Sub sensor 2",
        energy_value_sensor: "Energy value sensor",
        energy_percent_sensor: "Energy percent sensor (unit must be %, drives level bar)",
        vehicle_status_sensor: "Vehicle status sensor (ON/OFF drives gauge glow)",
        update_button: "Refresh data button entity (auto press in card view)",
        gps_update_button: "GPS refresh button entity (auto press in card view)",
        gauge_left: "Left gauge",
        gauge_right: "Right gauge",
        door: "Doors & Windows",
        belt: "Seat belts & Tires",
        other: "Other",
        map_style_normal: "Day mode",
        map_style_dark: "Night mode",
        map_style_auto: "Follow theme",
        err_entity: "Please select a location / history entity (entity)",
        reset_focus: "Reset view",
        left_front_door: "Front left door",
        left_rear_door: "Rear left door",
        right_front_door: "Front right door",
        right_rear_door: "Rear right door",
        left_front_door_lock: "Front left door lock",
        left_rear_door_lock: "Rear left door lock",
        right_front_door_lock: "Front right door lock",
        right_rear_door_lock: "Rear right door lock",
        left_front_window: "Front left window",
        left_rear_window: "Rear left window",
        right_front_window: "Front right window",
        right_rear_window: "Rear right window",
        sunroof_status: "Sunroof",
        engine_hood_status: "Engine hood",
        trunk_status: "Trunk",
        left_front_tyre_warning: "Front left tire warning",
        left_rear_tyre_warning: "Rear left tire warning",
        right_front_tyre_warning: "Front right tire warning",
        right_rear_tyre_warning: "Rear right tire warning",
        left_front_seat_belt: "Front left seat belt",
        left_rear_seat_belt: "Rear left seat belt",
        right_front_seat_belt: "Front right seat belt",
        right_rear_seat_belt: "Rear right seat belt",
        direction: "Heading (°)"
    }
};

function isZhLang(lang) {
    return !!lang && String(lang).toLowerCase().startsWith("zh");
}

// 编辑器语言检测: 通过 HA 内置翻译返回是否含中文判断 (computeLabel 内使用)
function editorLang(localize) {
    if (!localize) return "zh";
    const s = localize("ui.panel.lovelace.editor.card.generic.entity") || "";
    return /[\u4e00-\u9fa5]/.test(s) ? "zh" : "en";
}

/**
 * 车辆参数注册表
 * - key: 配置项名称（可在 UI 编辑器中为每个参数选择传感器实体）
 * - type: number 数值 / boolean 布尔 / notEqual 不等于 eq 时报警
 * - def: 默认值
 */
const VEHICLE_PARAMS = [
    // 车门 / 车窗 / 天窗
    { key: "left_front_door", type: "boolean", def: false, group: "door" },
    { key: "left_rear_door", type: "boolean", def: false, group: "door" },
    { key: "right_front_door", type: "boolean", def: false, group: "door" },
    { key: "right_rear_door", type: "boolean", def: false, group: "door" },
    { key: "left_front_door_lock", type: "boolean", def: true, group: "door" },
    { key: "left_rear_door_lock", type: "boolean", def: true, group: "door" },
    { key: "right_front_door_lock", type: "boolean", def: true, group: "door" },
    { key: "right_rear_door_lock", type: "boolean", def: true, group: "door" },
    { key: "left_front_window", type: "notEqual", eq: 2, def: 2, group: "door" },
    { key: "left_rear_window", type: "notEqual", eq: 2, def: 2, group: "door" },
    { key: "right_front_window", type: "notEqual", eq: 2, def: 2, group: "door" },
    { key: "right_rear_window", type: "notEqual", eq: 2, def: 2, group: "door" },
    { key: "sunroof_status", type: "notEqual", eq: 1, def: 1, group: "door" },
    { key: "engine_hood_status", type: "notEqual", eq: 0, def: 0, group: "door" },
    { key: "trunk_status", type: "notEqual", eq: 0, def: 0, group: "door" },
    // 安全带 / 轮胎    
    { key: "left_front_tyre_warning", type: "boolean", def: false, group: "belt" },
    { key: "left_rear_tyre_warning", type: "boolean", def: false, group: "belt" },
    { key: "right_front_tyre_warning", type: "boolean", def: false, group: "belt" },
    { key: "right_rear_tyre_warning", type: "boolean", def: false, group: "belt" },
    
    { key: "left_front_seat_belt", type: "boolean", def: true, group: "belt" },
    { key: "left_rear_seat_belt", type: "boolean", def: true, group: "belt" },
    { key: "right_front_seat_belt", type: "boolean", def: true, group: "belt" },
    { key: "right_rear_seat_belt", type: "boolean", def: true, group: "belt" },
    // 其他配置
    { key: "direction", type: "number", def: 0, group: "other" },
];

const PARAM_GROUPS = [
    { key: "gauge_left", label: { zh: "左仪表盘", en: "Left gauge" } },
    { key: "gauge_right", label: { zh: "右仪表盘", en: "Right gauge" } },
    { key: "door", label: { zh: "车门车窗", en: "Doors & Windows" } },
    { key: "belt", label: { zh: "安全带/轮胎", en: "Seat belts & Tires" } },
    { key: "other", label: { zh: "其他配置", en: "Other" } }
];

// 7 个状态图标坑位(固定位置不改变), 按"从中间向两侧"的顺序填充:
// 底部正中 -> 左下 -> 右下 -> 左 -> 右 -> 左中 -> 右中
const STATUS_SLOTS = [
    { cx: 300.5, cy: 538.1 }, // 底部正中(原中控锁)
    { cx: 206.4, cy: 519.6 }, // 左下(原机油压力)
    { cx: 396.6, cy: 519.8 }, // 右下(原制动液)
    { cx: 132.6, cy: 454.9 }, // 左(原胎压)
    { cx: 468.6, cy: 455.2 }, // 右(原灯光故障)
    { cx: 82.2, cy: 374.8 },  // 左中(原玻璃水)
    { cx: 522.6, cy: 372.9 }  // 右中(原冷却液)
];
const STATUS_SLOT_SIZE = 82;
// 旧版固定警告图标配置键: UI 编辑器中由 status_sensors 取代, 保留以兼容旧 YAML 配置
const LEGACY_STATUS_KEYS = ["central_locking", "engine_oil_pressure", "brake_fluid", "engine_coolant", "washer_fluid", "bulb"];

function truthy(value) {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value !== 0;
    if (typeof value === "string") {
        const s = value.trim().toLowerCase();
        return ![
            "", "off", "false", "0", "no", "none", "unavailable", "unknown",
            "closed", "close", "关闭",
            "unlocked", "解锁", "已解锁",
            "ok", "normal"
        ].includes(s);
    }
    return !!value;
}

// 状态图标激活规则: 只有状态为 "异常" 或 "已解锁" 时才点亮(active)
function statusActive(value) {
    const s = String(value == null ? "" : value).trim();
    return s === "异常" || s === "已解锁";
}

// 仪表盘主值显示为整数
function gaugeInt(value) {
    const n = Number(value);
    return isNaN(n) ? value : Math.round(n);
}

// 取传感器图标: attributes.icon -> 实体注册表 icon -> 兜底图标
function sensorIcon(state, registry, fallback) {
    return (state && state.attributes && state.attributes.icon)
        || (registry && registry.icon)
        || fallback;
}

// 车辆状态 -> ON / OFF (驱动仪表盘发光效果)
function vehicleStatusClass(value) {
    const s = String(value == null ? "" : value).trim().toLowerCase();
    return ["on", "running", "true", "1", "启动", "运行中", "已启动"].includes(s)
        ? "ON"
        : "OFF";
}

// 计算颜色亮度(0~1), 用于 auto 模式下判断深色/浅色主题
function _colorLightness(color) {
    const s = String(color || "").trim();
    if (!s) return 1;
    const rgb = s.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    let r, g, b;
    if (rgb) {
        r = rgb[1] / 255;
        g = rgb[2] / 255;
        b = rgb[3] / 255;
    } else {
        let hex = s.replace(/^#/, "");
        if (/^[0-9a-fA-F]{3}$/.test(hex)) hex = hex.split("").map(c => c + c).join("");
        if (!/^[0-9a-fA-F]{6}$/.test(hex)) return 1;
        r = parseInt(hex.substr(0, 2), 16) / 255;
        g = parseInt(hex.substr(2, 2), 16) / 255;
        b = parseInt(hex.substr(4, 2), 16) / 255;
    }
    return (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
}

export class CarCard extends LitElement {
    constructor() {
        super();
    }
    setConfig(config) {
        this.config = deepClone(config);
        this._updateBtnPressed = false;
        this._gpsUpdateBtnPressed = false;
    }
    firstUpdated(changedProperties) {
        super.firstUpdated && super.firstUpdated(changedProperties);
        this._maybePressUpdateButton();
    }
    updated(changedProperties) {
        super.updated && super.updated(changedProperties);
        this._maybePressUpdateButton();
    }
    _maybePressUpdateButton() {
        this._pressButtonOnce("update_button", "_updateBtnPressed");
        this._pressButtonOnce("gps_update_button", "_gpsUpdateBtnPressed");
    }
    _pressButtonOnce(configKey, flagName) {
        if (this[flagName] || this._isPanel) return;
        const btn = this.config && this.config[configKey];
        if (!btn) return;
        if (!this.hass || typeof this.hass.callService !== "function") return;
        this[flagName] = true;
        const domain = String(btn).split(".")[0];
        this.hass.callService(domain, "press", { entity_id: btn }).catch(() => {});
    }
    _resolveParam(param) {
        let raw;
        const sensor = this.config[param.key];
        if (sensor) {
            const s = this.hass.states[sensor];
            raw = s ? s.state : undefined;
        }
        if (raw === undefined || raw === null || raw === "") raw = param.def;
        switch (param.type) {
            case "number": {
                const n = Number(raw);
                return isNaN(n) ? 0 : n;
            }
            case "boolean":
                return truthy(raw);
            case "notEqual":
                // 二进制传感器: on/true/open = 开启(报警), off/false/closed = 关闭(正常)
                if (typeof raw === "boolean") return raw;
                if (typeof raw === "number") return raw !== param.eq;
                {
                    const s = String(raw).trim().toLowerCase();
                    // 兼容旧版数字状态: 不等于关闭值(eq)时报警
                    if (s !== "" && !isNaN(Number(s))) return Number(s) !== param.eq;
                    // 其余按二进制状态解析(open/closed/on/off/中文等)
                    return truthy(raw);
                }
            default:
                return raw;
        }
    }
    set isPanel(isPanel){ 	
        this._isPanel = isPanel;
      }
    static get properties() {
        return {
            hass: {},
            config: {},
            marker:0,
            path:0,
            historyPath:0,
            x0:false,
            y0:false,
            speedvalue:0
        };
    }
    static getConfigForm() {
        // 静态期语言: 用浏览器语言近似; computeLabel 内会用 localize 精确检测
        const lang = isZhLang(navigator && navigator.language) ? "zh" : "en";
        const L = (key) => (UI_STRINGS[lang] && UI_STRINGS[lang][key]) || UI_STRINGS.zh[key] || key;
        const schema = [
            {
                name: "entity",
                required: true,
                selector: { entity: {} }
            },
            {
                type: "grid",
                name: "",
                schema: [
                    { name: "aspect_ratio", default: 1, selector: { number: { min: 0.3, max: 1, step: 0.01, mode: "slider" } } },
                    { name: "traffic", default: true, selector: { boolean: {} } },
                    {
                        name: "dark_mode",
                        default: "auto",
                        selector: {
                            select: {
                                mode: "dropdown",
                                options: [
                                    { value: "normal", label: L("map_style_normal") },
                                    { value: "dark", label: L("map_style_dark") },
                                    { value: "auto", label: L("map_style_auto") }
                                ]
                            }
                        }
                    },
                    { name: "key", selector: { text: {} } },
                    { name: "securityJsCode", selector: { text: {} } }
                ]
            },
            ...PARAM_GROUPS.map(group => {
                const params = VEHICLE_PARAMS.filter(p => p.group === group.key && !LEGACY_STATUS_KEYS.includes(p.key));
                const extra = {
                    gauge_left: [
                        { name: "left_main_sensor", selector: { entity: {} } },
                        { name: "energy_value_sensor", selector: { entity: {} } },
                        { name: "energy_percent_sensor", selector: { entity: {} } },
                        { name: "status_sensors", selector: { entity: { multiple: true } } }
                    ],
                    gauge_right: [
                        { name: "right_main_sensor", selector: { entity: {} } },
                        { name: "sub_sensor_1", selector: { entity: {} } },
                        { name: "sub_sensor_2", selector: { entity: {} } }
                    ],
                    other: [
                        { name: "vehicle_status_sensor", selector: { entity: {} } },
                        { name: "update_button", selector: { entity: { domain: ["button", "input_button"] } } },
                        { name: "gps_update_button", selector: { entity: { domain: ["button", "input_button"] } } }
                    ]
                }[group.key] || [];
                return {
                    type: "expandable",
                    name: "",
                    title: (group.label && (group.label[lang] || group.label.zh)) || L(group.key),
                    expanded: true,
                    schema: [
                        ...extra,
                        ...params.map(p => ({
                            name: p.key,
                            selector: { entity: {} }
                        }))
                    ]
                };
            })
        ];
        const assertConfig = (config) => {
            if (!config || !config.entity) {
                throw new Error(L("err_entity"));
            }
        };
        const computeLabel = (schema, localize) => {
            if (schema.name === "entity") {
                return localize("ui.panel.lovelace.editor.card.generic.entity");
            }
            if (schema.name && UI_STRINGS.zh[schema.name]) {
                const l = editorLang(localize);
                return (UI_STRINGS[l] && UI_STRINGS[l][schema.name]) || UI_STRINGS.zh[schema.name];
            }
            return undefined;
        };
        return { schema, assertConfig, computeLabel };
    }
    static getStubConfig() {
        return {name: 'car',
                entity: '',
            };
    }
    
    render() {
        const state = this.hass.states[this.config.entity] || { attributes: {} };
        const values = {};
        VEHICLE_PARAMS.forEach(p => { values[p.key] = this._resolveParam(p); });
        const rawStatusSensors = this.config.status_sensors;
        const hasCustomStatus = Array.isArray(rawStatusSensors) || (typeof rawStatusSensors === "string" && !!rawStatusSensors);
        const rawSensorList = Array.isArray(rawStatusSensors)
            ? rawStatusSensors
            : (typeof rawStatusSensors === "string" ? [rawStatusSensors] : []);
        const statusSensorList = rawSensorList
            .map(item => typeof item === "string" ? { entity: item, invert: false } : item)
            .filter(item => item && item.entity)
            .slice(0, STATUS_SLOTS.length);
        const statusSlots = statusSensorList.map((item, i) => {
            const slot = STATUS_SLOTS[i];
            if (!slot) return null;
            const st = this.hass.states[item.entity];
            const attrs = (st && st.attributes) || {};
            const reg = this.hass.entities && this.hass.entities[item.entity];
            return {
                entity: item.entity,
                icon: attrs.icon || (reg && reg.icon) || "mdi:alert-circle",
                active: item.invert ? !statusActive(st ? st.state : undefined) : statusActive(st ? st.state : undefined)
            };
        }).filter(Boolean);
        // 右仪表盘主值: right_main_sensor 的 raw 状态和单位
        const rightMainSensor = this.config.right_main_sensor;
        const rightMainSensorState = rightMainSensor ? this.hass.states[rightMainSensor] : undefined;
        const rightGauge = gaugeInt(rightMainSensorState ? rightMainSensorState.state : "");
        const rightGaugeUnit = rightMainSensorState && rightMainSensorState.attributes && rightMainSensorState.attributes.unit_of_measurement
            ? rightMainSensorState.attributes.unit_of_measurement
            : "";
        const tyreDriver = values.left_front_tyre_warning;
        const tyreDriverRear = values.left_rear_tyre_warning;
        const tyrePassenger = values.right_front_tyre_warning;
        const tyrePassengerRear = values.right_rear_tyre_warning;
        // 第一子传感器 (里程文本): sub_sensor_1 的 raw + unit
        const subSensor1 = this.config.sub_sensor_1;
        const subSensor1State = subSensor1 ? this.hass.states[subSensor1] : undefined;
        const subSensor1Text = subSensor1State
            ? `${gaugeInt(subSensor1State.state)}${(subSensor1State.attributes && subSensor1State.attributes.unit_of_measurement) || ""}`
            : "";
        // 第二子传感器 (保养文本): sub_sensor_2 的 raw + unit
        const subSensor2 = this.config.sub_sensor_2;
        const subSensor2State = subSensor2 ? this.hass.states[subSensor2] : undefined;
        const subSensor2Text = subSensor2State
            ? `${gaugeInt(subSensor2State.state)}${(subSensor2State.attributes && subSensor2State.attributes.unit_of_measurement) || ""}`
            : "";
        // 子传感器图标
        const subSensor1Icon = sensorIcon(subSensor1State, subSensor1 && this.hass.entities && this.hass.entities[subSensor1], "mdi:counter");
        const subSensor2Icon = sensorIcon(subSensor2State, subSensor2 && this.hass.entities && this.hass.entities[subSensor2], "mdi:wrench");
        // 左仪表盘主值: left_main_sensor 的 raw + unit
        const leftMainSensor = this.config.left_main_sensor;
        const leftMainSensorState = leftMainSensor ? this.hass.states[leftMainSensor] : undefined;
        const leftGauge = gaugeInt(leftMainSensorState ? leftMainSensorState.state : "");
        const leftGaugeUnit = leftMainSensorState && leftMainSensorState.attributes && leftMainSensorState.attributes.unit_of_measurement
            ? leftMainSensorState.attributes.unit_of_measurement
            : "";
        // 能耗值 / 能耗百分比: 顶部 "能耗值/百分比" 文本, 文本由 raw + unit_of_measurement 组成
        const energyValueSensor = this.config.energy_value_sensor;
        const energyValueState = energyValueSensor ? this.hass.states[energyValueSensor] : undefined;
        const energyValueIcon = sensorIcon(energyValueState, energyValueSensor && this.hass.entities && this.hass.entities[energyValueSensor], "mdi:gas-station");
        const energyValueText = energyValueState
            ? `${gaugeInt(energyValueState.state)}${(energyValueState.attributes && energyValueState.attributes.unit_of_measurement) || ""}`
            : "";
        const energyPercentSensor = this.config.energy_percent_sensor;
        const energyPercentState = energyPercentSensor ? this.hass.states[energyPercentSensor] : undefined;
        const energyPercentText = energyPercentState
            ? `${gaugeInt(energyPercentState.state)}${(energyPercentState.attributes && energyPercentState.attributes.unit_of_measurement) || ""}`
            : "";
        // 能耗液位条: 配置能耗百分比传感器时按百分比驱动
        const energyBarPercent = energyPercentState
            ? (Number(energyPercentState.state) || 0)
            : 0;
        const leftFrontSeatBelt = values.left_front_seat_belt;
        const leftRearSeatBelt = values.left_rear_seat_belt;
        const rightFrontSeatBelt = values.right_front_seat_belt;
        const rightRearSeatBelt = values.right_rear_seat_belt;
        const engineHoodStatus = values.engine_hood_status;
        const trunkStatus = values.trunk_status;
        const leftFrontDoor = values.left_front_door;
        const leftRearDoor = values.left_rear_door;
        const rightFrontDoor = values.right_front_door;
        const rightRearDoor = values.right_rear_door;
        const leftFrontDoorLock = values.left_front_door_lock;
        const leftRearDoorLock = values.left_rear_door_lock;
        const rightFrontDoorLock = values.right_front_door_lock;
        const rightRearDoorLock = values.right_rear_door_lock;
        const leftFrontWindow = values.left_front_window;
        const leftRearWindow = values.left_rear_window;
        const rightFrontWindow = values.right_front_window;
        const rightRearWindow = values.right_rear_window;
        const sunroofStatus = values.sunroof_status;
        // 车辆状态: vehicle_status_sensor 驱动仪表盘发光 (ON / OFF)
        const vehicleStatusSensor = this.config.vehicle_status_sensor;
        const vehicleStatusState = vehicleStatusSensor ? this.hass.states[vehicleStatusSensor] : undefined;
        const containerClass = vehicleStatusState ? vehicleStatusClass(vehicleStatusState.state) : "";
        // 运行时语言: 跟随 Home Assistant 界面语言
        const runtimeLang = isZhLang(this.hass && (this.hass.locale ? this.hass.locale.language : this.hass.language)) ? "zh" : "en";
        const fitTitle = UI_STRINGS[runtimeLang].reset_focus;
        let newl = state.attributes.longitude+"_"+state.attributes.latitude;
        if(this._isPanel){
            this.setAttribute("is-panel","");
          }
        if(this.map){
            //实时路况图层(默认开启, 与编辑器开关语义一致)
            if(this.config.traffic !== false){
                this.trafficLayer.show();
            }else{
                this.trafficLayer.hide();
            }
            //方向
            if(this.ll!=newl){
                this.ll = newl;
                let angle = 360-(values.direction||0);
                this._addMarker(this.config.entity,angle);
            }
            //更新式样
            let dark_mode = this.config.dark_mode;
            let newTheme = this.hass.themes.default_theme;
            let style = dark_mode;
            
            if(this.old_mode!=dark_mode || this.old_theme!=newTheme){
                if(dark_mode==="auto"){
                    let theme = this.hass.themes.themes[newTheme] || {};
                    let cardColor = theme["primary-background-color"] || "#FFFFFF";
                    style = _colorLightness(cardColor)<0.5?'dark':'normal';
                    this.map.setMapStyle("amap://styles/"+style);
                    this.old_mode = dark_mode;
                    this.old_theme = newTheme;
                    this.theme=this.hass.themes.default_theme;
                }else{
                    this.map.setMapStyle("amap://styles/"+style);
                    this.old_mode = dark_mode;
                    this.old_theme = newTheme;
                }
            }
        }

        return html`
        <style>
        #aspect-ratio::before {content: "";display: block;padding-bottom: ${100*(this.config.aspect_ratio||1)}%;}
        </style>
<div id="aspect-ratio">        
    <ha-card>
    <div id="map"></div>
    <div id="container" class="${containerClass}">
        <div id="left">
            <div class="radiusbox">
                <div class="rabiusboxline">
                <svg version="1.1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px" y="0px" viewBox="0 0 600 600" style="enable-background:new 0 0 600 600;" xml:space="preserve">
                <path class="svgrabiusboxline" d="M300,0c43.6,0,85,9.3,122.5,26c4.3,2.1,8.6,4.2,13,6.2c66.9,30.7,141,48.7,258,50.7v433.3
                c-112.5,1.9-182.5,18-246.4,45.6c-12.4,5.3-24.5,11.1-36.4,17.3c-34.3,13.6-71.6,21-110.6,21C134.3,600,0,465.7,0,300
                C0,134.3,134.3,0,300,0z"/>
            <foreignObject class="status" x="38" y="148" width="76" height="76">
                <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
                    <ha-icon icon="${energyValueIcon}" style="width:100%;height:100%;--mdc-icon-size:76px;"></ha-icon>
                </div>
            </foreignObject>
            <g id="energyLevelStatus">
                <path id="l1" class="status ${energyBarPercent/10>0?"active":""}" d="M527.6,156.2c-17.2-23-38.1-43.2-61.6-59.7l4.1-5.1C492.6,109.7,512.1,131.6,527.6,156.2z"/>
                <path id="l2" class="status ${energyBarPercent/10>1?"active":""}" d="M466.9,88.7l-4.3,5.4c-11.9-8.1-24.5-15.3-37.7-21.4l4.7-8.7C442.8,71.2,455.2,79.5,466.9,88.7z"/>
                <path id="l3" class="status ${energyBarPercent/10>2?"active":""}" d="M426,62l-4.9,9c-12.9-5.8-26.4-10.6-40.3-14.3l4-12.3C399.1,49.1,412.9,55,426,62z"/>
                <path id="l4" class="status ${energyBarPercent/10>3?"active":""}" d="M380.9,43.1l-4.1,12.5c-13.5-3.4-27.4-5.8-41.6-7.1l2-15.3C352.2,35.4,366.8,38.7,380.9,43.1z"/>
                <path id="l5" class="status ${energyBarPercent/10>4?"active":""}" d="M333.1,32.8l-2,15.4c-6.8-0.5-13.7-0.8-20.6-0.8c-7.1,0-14.2,0.3-21.1,0.8L288.4,31c3.8-0.2,7.7-0.3,11.6-0.3C311.2,30.8,322.2,31.4,333.1,32.8z"/>
                <path id="l6" class="status ${energyBarPercent/10>5?"active":""}" d="M285.1,48.6c-13.9,1.3-27.6,3.6-40.8,7L240,37.5c14.4-3.3,29.1-5.4,44.3-6.3L285.1,48.6z"/>
                <path id="l7" class="status ${energyBarPercent/10>6?"active":""}" d="M240.2,56.6c-13.4,3.6-26.4,8.2-38.9,13.7l-7.8-17.6c13.6-5.9,27.8-10.6,42.4-14.2L240.2,56.6z"/>
                <path id="l8" class="status ${energyBarPercent/10>7?"active":""}" d="M197.5,72c-12.6,5.7-24.6,12.4-36,20l-10.9-16c12.4-8.3,25.4-15.5,39.1-21.7L197.5,72z"/>
                <path id="l9" class="status ${energyBarPercent/10>8?"active":""}" d="M158,94.3c-11.4,7.8-22.2,16.4-32.3,25.8l-13.2-13.3c10.7-10.4,22.3-19.9,34.6-28.4L158,94.3z"/>
                <path id="l10" class="status ${energyBarPercent/10>9?"active":""}" d="M122.7,122.9c-9.7,9.3-18.6,19.2-26.8,29.8l-13.4-11.4c8.2-11.2,17.2-21.8,27.1-31.6L122.7,122.9z"/>
            </g>
            <foreignObject class="status ${hasCustomStatus && statusSlots[0] ? (statusSlots[0].active ? "active" : "") : "hidden"}" x="${STATUS_SLOTS[0].cx - STATUS_SLOT_SIZE / 2}" y="${STATUS_SLOTS[0].cy - STATUS_SLOT_SIZE / 2}" width="${STATUS_SLOT_SIZE}" height="${STATUS_SLOT_SIZE}">
                ${hasCustomStatus && statusSlots[0] ? html`
                <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
                    <ha-icon icon="${statusSlots[0].icon}" style="width:100%;height:100%;--mdc-icon-size:62px;"></ha-icon>
                </div>` : ""}
            </foreignObject>
            <foreignObject class="status ${hasCustomStatus && statusSlots[1] ? (statusSlots[1].active ? "active" : "") : "hidden"}" x="${STATUS_SLOTS[1].cx - STATUS_SLOT_SIZE / 2}" y="${STATUS_SLOTS[1].cy - STATUS_SLOT_SIZE / 2}" width="${STATUS_SLOT_SIZE}" height="${STATUS_SLOT_SIZE}">
                ${hasCustomStatus && statusSlots[1] ? html`
                <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
                    <ha-icon icon="${statusSlots[1].icon}" style="width:100%;height:100%;--mdc-icon-size:62px;"></ha-icon>
                </div>` : ""}
            </foreignObject>
            <foreignObject class="status ${hasCustomStatus && statusSlots[2] ? (statusSlots[2].active ? "active" : "") : "hidden"}" x="${STATUS_SLOTS[2].cx - STATUS_SLOT_SIZE / 2}" y="${STATUS_SLOTS[2].cy - STATUS_SLOT_SIZE / 2}" width="${STATUS_SLOT_SIZE}" height="${STATUS_SLOT_SIZE}">
                ${hasCustomStatus && statusSlots[2] ? html`
                <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
                    <ha-icon icon="${statusSlots[2].icon}" style="width:100%;height:100%;--mdc-icon-size:62px;"></ha-icon>
                </div>` : ""}
            </foreignObject>
            <foreignObject class="status ${hasCustomStatus && statusSlots[3] ? (statusSlots[3].active ? "active" : "") : "hidden"}" x="${STATUS_SLOTS[3].cx - STATUS_SLOT_SIZE / 2}" y="${STATUS_SLOTS[3].cy - STATUS_SLOT_SIZE / 2}" width="${STATUS_SLOT_SIZE}" height="${STATUS_SLOT_SIZE}">
                ${hasCustomStatus && statusSlots[3] ? html`
                <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
                    <ha-icon icon="${statusSlots[3].icon}" style="width:100%;height:100%;--mdc-icon-size:62px;"></ha-icon>
                </div>` : ""}
            </foreignObject>
            <foreignObject class="status ${hasCustomStatus && statusSlots[4] ? (statusSlots[4].active ? "active" : "") : "hidden"}" x="${STATUS_SLOTS[4].cx - STATUS_SLOT_SIZE / 2}" y="${STATUS_SLOTS[4].cy - STATUS_SLOT_SIZE / 2}" width="${STATUS_SLOT_SIZE}" height="${STATUS_SLOT_SIZE}">
                ${hasCustomStatus && statusSlots[4] ? html`
                <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
                    <ha-icon icon="${statusSlots[4].icon}" style="width:100%;height:100%;--mdc-icon-size:62px;"></ha-icon>
                </div>` : ""}
            </foreignObject>
            <foreignObject class="status ${hasCustomStatus && statusSlots[5] ? (statusSlots[5].active ? "active" : "") : "hidden"}" x="${STATUS_SLOTS[5].cx - STATUS_SLOT_SIZE / 2}" y="${STATUS_SLOTS[5].cy - STATUS_SLOT_SIZE / 2}" width="${STATUS_SLOT_SIZE}" height="${STATUS_SLOT_SIZE}">
                ${hasCustomStatus && statusSlots[5] ? html`
                <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
                    <ha-icon icon="${statusSlots[5].icon}" style="width:100%;height:100%;--mdc-icon-size:62px;"></ha-icon>
                </div>` : ""}
            </foreignObject>
            <foreignObject class="status ${hasCustomStatus && statusSlots[6] ? (statusSlots[6].active ? "active" : "") : "hidden"}" x="${STATUS_SLOTS[6].cx - STATUS_SLOT_SIZE / 2}" y="${STATUS_SLOTS[6].cy - STATUS_SLOT_SIZE / 2}" width="${STATUS_SLOT_SIZE}" height="${STATUS_SLOT_SIZE}">
                ${hasCustomStatus && statusSlots[6] ? html`
                <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
                    <ha-icon icon="${statusSlots[6].icon}" style="width:100%;height:100%;--mdc-icon-size:62px;"></ha-icon>
                </div>` : ""}
            </foreignObject>

            <text x="300" y="130">${energyValueText}/${energyPercentText}</text>
            <text id="exteriorTemp" x="300" y="380">${leftGauge}</text>
            <text x="380" y="210">${leftGaugeUnit}</text>
            </svg>
                </div>
            </div>
        </div>
        <div id="center">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 298.5 607" xml:space="preserve">
        <g id="图层_1">
            <path id="background" class="st2" d="M295.2,214.7c-3.9-6.3-10.5-15-20.1-20.5l-0.2-0.1c-1.3-0.8-4.3-1.3-5.9-1.5v-15.8h0.2V90.9
            c-4.2-52.2-27.8-67.2-28.8-67.8C211.2,1.4,179.3,0,179,0h-59.5c-0.3,0-32.2,1.4-61.3,23.3c-1,0.6-24.6,15.6-28.8,67.9V176v1v15.4
            c-1.6,0.2-4.5,0.7-5.8,1.5l-0.3,0.1c-9.6,5.5-16.3,14.2-20.1,20.6C3,215-2.3,224.6,1,231.7c0.6,1.2,2.1,2.8,4.5,2.8
            c0.8,0,1.8-0.2,2.8-0.7l20.4-12.2v58.9c-0.6,0.4-1.2,1.3-1.6,2.9c-0.9,2.7-1.4,7.1-1.4,13.2c0,12.2,1.9,16,3.1,17.2v10.1L30,424.4
            c-1.2,0.9-2.8,3.7-2.8,12.1c0,7,0.7,11.1,2,12.5v13.1l-0.4,19.5c0,0.9,0,22.2,2.5,34.3L47,580.1c0.1,0.2,2.1,5.2,11.7,10.9
            c12.4,7.3,38.1,16.1,90.6,16.1c53.2,0,79-9,91.2-16.5c8.9-5.5,10.8-10.2,10.9-10.6l15.7-64.1c2.5-12.1,2.5-33.3,2.5-34.2l-0.4-19.5
            V449c1.4-1.4,2.1-5.6,2.1-12.5c0-8.4-1.6-11.2-2.8-12.1l1.1-100.1v-0.4v-10c0.3-0.3,0.6-0.8,0.9-1.4c1.1-2.1,2.2-6.5,2.2-15.9
            c0-8.9-0.9-14.2-2.8-15.8c-0.1-0.1-0.1-0.1-0.2-0.2v-58.7l20.5,12.3c1,0.5,1.9,0.7,2.7,0.7c2.4,0,3.9-1.7,4.5-2.9
            C300.7,224.8,295.5,215.2,295.2,214.7z"/>
            <g>
                <path d="M153.5,7.1h-8.8v7.6h8.8V7.1z M152,13.1h-5.8V8.6h5.8V13.1z"/>
                <path d="M271.3,436.5c0-8.4-1.6-11.2-2.8-12.1l1.1-100.5h0v-10.1c1.2-1.2,3.1-5,3.1-17.2c0-8.9-0.9-14.2-2.8-15.8c-0.1-0.1-0.1-0.1-0.2-0.2l0-61.7h-2.1l0,63.6l0.9-0.1c0.4,0.4,2,2.7,2,14.2c0,13.7-2.4,15.6-2.3,15.6c0,0,0,0,0,0l-0.7,0.2v11.5h0l0,0.4l-10.3,6.4c0,0,0,0,0,0l0,0c-0.1,0.1-7.7,5-15.7,8v-53.7c0-0.5,1.2-48.7,12.3-81.5l1.9-1v-22.1c7.5-3.6,12.3-3.2,12.4-3.2l0-0.4h1.1l0-85.9c-4.2-52.2-27.8-67.2-28.8-67.8C211.2,1.4,179.3,0,179,0l-59.5,0c-0.3,0-32.2,1.4-61.3,23.3c-1,0.6-24.6,15.6-28.8,67.9V177h1.1l0,0.4c0.1,0,4.9-0.4,12.4,3.2v22.1l1.9,1c11.2,32.8,12.3,81,12.3,81.5v53.7c-0.1-0.1-0.3-0.1-0.4-0.2c-0.3-0.1-0.5-0.2-0.8-0.3c-0.2-0.1-0.5-0.2-0.7-0.3c-0.3-0.1-0.5-0.2-0.8-0.3c-0.2-0.1-0.5-0.2-0.7-0.3c-0.2-0.1-0.5-0.2-0.7-0.3c-0.3-0.1-0.5-0.2-0.7-0.3c-0.2-0.1-0.5-0.2-0.7-0.3c-0.3-0.1-0.5-0.2-0.8-0.4c-0.2-0.1-0.4-0.2-0.6-0.3c-0.3-0.1-0.5-0.3-0.8-0.4c-0.2-0.1-0.4-0.2-0.5-0.3c-0.3-0.1-0.5-0.3-0.8-0.4c-0.2-0.1-0.3-0.2-0.5-0.3c-0.3-0.1-0.5-0.3-0.8-0.4c-0.1-0.1-0.3-0.1-0.4-0.2c-0.3-0.1-0.5-0.3-0.8-0.4c-0.1-0.1-0.2-0.1-0.3-0.2c-0.3-0.2-0.5-0.3-0.8-0.4c-0.1,0-0.1-0.1-0.2-0.1c-0.3-0.2-0.6-0.3-0.8-0.5c0,0,0,0,0,0c-1.3-0.8-2.1-1.3-2.1-1.3l-0.2,0.4l0.2-0.4L31,324.4l0-0.4h0v-10.8l0.1-0.7l-0.7-0.2c0,0-2.5-1.8-2.5-15.7c0-11.5,1.6-13.8,2-14.2l0.9,0.1v-64.1h-2.1v62.2c-0.1,0-0.1,0.1-0.2,0.2c-1.8,1.6-2.8,6.9-2.8,15.8c0,12.2,1.9,16,3.1,17.2v10.1h0L30,424.4c-1.2,0.9-2.8,3.7-2.8,12.1c0,7,0.7,11.1,2,12.5v13.1l-0.4,19.5c0,0.9,0,22.2,2.5,34.3l15.7,64.2c0.1,0.2,2.1,5.2,11.7,10.9c12.4,7.3,38.1,16.1,90.6,16.1c53.2,0,79-9,91.2-16.5c8.9-5.5,10.8-10.2,10.9-10.6l15.7-64.1c2.5-12.1,2.5-33.3,2.5-34.2l-0.4-19.5V449C270.6,447.6,271.3,443.4,271.3,436.5z M253,203.1l-0.1,0.2c-11.3,32.9-12.4,81.4-12.5,81.9v54.3l-0.3,88.3c0,0.9,0,13.1,1.4,25.9l-0.3,0L245,515c-0.8,3.1-8.4,5.3-21,6.2l6-274.3c4.2-0.5,6.8-2.8,7.6-6.8l11.2-67.3c3.1,3.6,5.1,6.4,5.7,7.4l0.2,0.2v21.7L253,203.1z M241.7,555.3c0,0-0.1,0.3-0.2,0.8l-0.8-22.7c2.3-6.2,3.8-12,4.6-15.4C246.9,535.5,241.8,555.1,241.7,555.3z M56.7,555.3c-0.1-0.2-5.1-19.8-3.5-37.2c0.8,3.4,2.3,9.1,4.6,15.4L57,556.2C56.8,555.7,56.8,555.3,56.7,555.3z M57.8,558.1l0.8-22.5c3.1,7.8,7.6,15.8,13.6,20.1c0.2,0.1,20.8,12.8,76.8,12.8h0.4c56,0,76.6-12.7,76.8-12.8c6-4.2,10.5-12.3,13.6-20.1l0.8,22.4l0,0.4c-2.1,5.1-8.1,15.2-23.1,22.5c-20.7,10-67.8,9.9-68.4,9.9c-0.4,0-47.6,0.1-68.3-9.9c-15-7.3-20.9-17.4-23.1-22.5L57.8,558.1z M239.8,533L239.8,533l-0.1,0.2c-3.1,8.3-7.7,17.3-14,21.7c-0.2,0.1-20.6,12.6-76.3,12.6h-0.4c-55.7,0-76.1-12.5-76.3-12.6c-6.3-4.4-10.9-13.4-14.1-21.7l0-0.2l-0.1,0c-2.5-6.5-4-12.7-4.7-15.8c3.5,3.1,13,4.4,21,5c4.3,0.3,7.6,0.3,7.7,0.3h66.7h66.6c0,0,3.3,0,7.6-0.3c8-0.6,17.5-1.9,21-5C243.8,520.4,242.3,526.5,239.8,533z M69.8,33.6c-2.7,3.5-5.2,7.5-7.3,11.9c-0.1,0.2-8.2,21.2-9.6,40.1l0,0.3c-1.8-1-5.6-3.3-6.2-5.1c0-0.1-3.8-12,1.1-33.3c4.6-20.1,16.9-21.1,18.1-21.2C66.6,26.7,70.5,29,69.8,33.6z M53.9,85.6c1.3-18.7,9.4-39.6,9.5-39.8c2.1-4.4,4.6-8.3,7.3-11.8l0.1,0c0,0,0-0.1,0-0.1c11.2-14.5,26.2-21.8,35.9-25.1l-1.7,73.3l3.3-73.9c4.7-1.5,7.8-2.1,7.9-2.1l66.3,0c0.1,0,3.2,0.6,7.9,2.1l3.3,73.9l-1.7-73.3c9.7,3.4,24.7,10.6,35.9,25.1c0,0,0,0.1,0,0.1l0.1,0c2.7,3.5,5.1,7.4,7.2,11.8c0.1,0.2,8.2,21.1,9.5,39.8l3.6,83.7l-16.5-24l-0.1-0.1c-0.3-0.2-27.6-16.5-82.4-16.5c-54.7,0-82,16.3-82.3,16.5l-16.6,24.1L53.9,85.6z M232.6,26.3c1.2,0.1,13.5,1.1,18.1,21.2c4.9,21.3,1.1,33.1,1.1,33.2c-0.7,1.8-4.4,4.1-6.2,5.1l0-0.3c-1.4-18.9-9.5-39.9-9.6-40.1c-2.1-4.4-4.6-8.3-7.2-11.9C228,29,231.9,26.7,232.6,26.3z M247.5,169.9c-5.9-6.7-14.7-15.1-25-20.1c-0.2-0.1-20-11.4-73.2-11.4h-0.1c-53.2,0-73,11.3-73.2,11.4c-10.3,5.1-19.1,13.5-25,20.2l16.4-24c1.7-1,28.8-16.3,81.8-16.3c53,0,80.1,15.3,81.8,16.3L247.5,169.9z M76.5,150.5c0.2-0.1,19.9-11.3,72.7-11.3h0.1c52.9,0,72.6,11.2,72.8,11.3c10.9,5.4,20.2,14.6,26,21.4l-11.4,68c-0.8,3.7-3.2,5.7-7.2,6.1h0c-3.7,0.3-7.4-0.9-7.4-0.9c-0.3-0.1-26.3-10.2-72.8-10.2c-46.5,0-72.5,10.1-72.8,10.1c0,0-3.7,1.3-7.4,0.9c-4.1-0.3-6.5-2.4-7.3-6.1l-11.3-68.1C56.3,165.1,65.5,155.9,76.5,150.5z M76.7,246c0.3-0.1,26.1-10.1,72.5-10.1c46.3,0,72.2,10,72.5,10.1c0.1,0,3.1,1,6.5,1c0.3,0,0.6,0,0.8,0l-6,274.3c-4.1,0.3-7.1,0.3-7.2,0.3H82.6c0,0-3.1,0-7.2-0.3l-6-274.3C73.1,247.2,76.6,246,76.7,246z M31.5,176.5l0-85.2c4.1-51,27.6-66,27.9-66.2C88,3.5,119.2,2.1,119.5,2.1l59.4,0c0.3,0,31.5,1.4,60.3,23c0.2,0.1,23.7,15.2,27.8,66.1v85.3c-1.9,0.1-6,0.5-11.7,3.2c0,0,0,0,0,0l-6.2-9.1l-3.6-83.8c0.3-0.1,6.1-3.1,7-5.8c0-0.1,3.9-12.2-1-33.7c-5-21.7-18.8-21.9-19.1-21.9c0,0,0,0,0,0l-0.2,0c-0.1,0-4.5,2.2-4.6,6.9c-17.9-22.4-44.8-27-45.2-27.1l-66.5,0c-0.3,0.1-27.2,4.7-45.2,27.1c-0.1-4.6-4.6-6.8-4.6-6.9l-0.2,0c0,0,0,0,0,0c-0.2,0-14.1,0.2-19.1,21.9c-5,21.5-1.1,33.6-1,33.8c1,2.7,6.8,5.7,7,5.8l0,0l-3.6,83.8l-6.2,9.1c0,0,0,0,0,0C37.4,177.1,33.3,176.6,31.5,176.5z M45.5,203.2l-0.1-0.2l-1.7-0.9v-21.7l0.2-0.2c0.7-0.9,2.7-3.8,5.8-7.4l11.2,67.3c0.8,4,3.5,6.3,7.7,6.7l6,274.3c-12.5-0.9-20.2-3.2-21-6.2c0,0,0,0,0,0l3.9-65.3l-0.2,0c1-11.2,1-21.2,1-21.9L58,339.5v-54.4C58,284.7,56.8,236.2,45.5,203.2z M30.6,447.4c-0.3-0.5-1.3-2.6-1.3-10.9c0-9.3,2-10.4,1.9-10.4c0,0,0,0,0,0l0.9-0.1L31,325.5l9.8,6.1l0,0c0,0,2.1,1.4,5.1,3.1c0,0,0.1,0.1,0.1,0.1c0.3,0.2,0.7,0.4,1,0.6c0.1,0,0.1,0.1,0.2,0.1c0.3,0.2,0.7,0.4,1,0.6c0.1,0.1,0.2,0.1,0.3,0.2c0.3,0.2,0.7,0.3,1,0.5c0.1,0.1,0.3,0.1,0.4,0.2c0.3,0.2,0.6,0.3,1,0.5c0.2,0.1,0.4,0.2,0.5,0.2c0.3,0.1,0.6,0.3,0.9,0.4c0.2,0.1,0.4,0.2,0.6,0.3c0.3,0.1,0.6,0.3,0.9,0.4c0.2,0.1,0.4,0.2,0.6,0.3c0.3,0.1,0.6,0.2,0.9,0.4c0.2,0.1,0.5,0.2,0.7,0.3c0.2,0.1,0.5,0.2,0.7,0.3l0.3,88c0,0.4-0.1,35.4-6.7,49c-0.2,0.2-1.3,1.1-2.3,1c-0.6-0.1-1.1-0.6-1.6-1.4l-0.4,0.2l0.2-0.4c-0.1-0.1-10.1-5.9-15.3-13l0-1l-1.1,0h1.1v-14.8L30.6,447.4z M49.1,579.4l-15.7-64c-2.5-11.8-2.5-33.6-2.5-33.8l0.3-17c5.2,6.6,13.9,11.8,14.8,12.3c0.6,1,1.3,1.6,2.2,1.8c0.1,0,0.3,0,0.4,0c1.5,0,2.7-1.2,2.8-1.3l0.1-0.1c2-4,3.4-9.7,4.4-15.8L52.6,515l0,0.1l0,0.1c0,0,0,0,0,0c0,0.1,0.1,0.4,0.2,0.8l-0.2,0c-2.3,18,3.3,39.4,3.3,39.6c0,0,0.3,1.2,1.1,3.1l1.3,29.4C50.9,583.4,49.1,579.4,49.1,579.4z M149.2,604.9c-51.9,0-77.3-8.6-89.4-15.8c-0.2-0.1-0.4-0.3-0.7-0.4l-1.2-27.9c2.8,5.6,9.1,14.4,22.6,21c20.2,9.8,65.2,10,68.6,10c0.2,0,0.2,0,0.4,0c3.3,0,48.3-0.2,68.5-10c13.5-6.5,19.8-15.4,22.6-21l-1.2,27.9C227.3,596.1,201.9,604.9,149.2,604.9z M265.1,515.4l-15.6,63.9c0,0-1.8,4-9.2,8.8l1.3-29.4c0.8-1.9,1.1-3.1,1.1-3.1c0.1-0.2,5.6-21.6,3.3-39.6l-0.2,0c0.1-0.4,0.1-0.7,0.2-0.8l0,0l0-0.1l-3.1-53.3c1,6,2.4,11.6,4.3,15.5l0.1,0.1c0.1,0.1,1.3,1.3,2.8,1.3c0.1,0,0.3,0,0.4,0c0.9-0.1,1.6-0.7,2.2-1.8c0.9-0.5,9.6-5.7,14.8-12.3l0.3,17C267.6,481.9,267.5,503.6,265.1,515.4z M267.2,462.2l0,1c-5.2,7.2-15.2,13-15.3,13l0.2,0.4l-0.4-0.2c-0.4,0.8-1,1.3-1.6,1.4c-1,0.2-2.1-0.7-2.3-1c-6.7-13.6-6.7-48.7-6.7-49l0.3-88c8.3-3,16.1-8.2,16.2-8.2l0,0l9.8-6.1l-1.1,99.5l-0.2,0.9l0.9,0.1c0,0,2,1.1,2,10.4c0,8.3-1,10.4-1.3,10.9l-0.7,0V462.2l1.1,0L267.2,462.2z"/>
                <path d="M149.2,512.4c0.1,0,0.3,0,0.5,0c1.3,0,4.6-0.4,5.9-4.6c1.2-4,0.6-14.6-2.3-20c-1.1-1.9-2.4-3.1-3.9-3.5l-0.1,0l-0.2,0c-1.5,0.4-2.8,1.6-3.9,3.5c-3,5.4-3.6,16-2.3,20C144.4,512.8,148.8,512.5,149.2,512.4z M146,488.3c0.9-1.7,2-2.7,3.2-3.1c1.2,0.4,2.3,1.4,3.2,3.1c3.1,5.5,3.3,15.8,2.3,19.3c-1.3,4.5-5.2,4-5.5,3.9l-0.1,0c-0.2,0-4.1,0.5-5.4-3.9C142.7,504.1,142.9,493.8,146,488.3z"/>
            </g>
        </g>
        <g id="座位">
            <g>
                <path d="M215.9,401.3c-5.5-7.4-9.4-10-9.5-10.1l-0.3-0.2l-32,0c-0.4-0.1-2.5-0.3-6.3,4.2h-38.1c-3.3-4.3-5.5-4.5-6.3-4.2H93.9c-1.2-0.3-4.3,0.6-11.2,10.5c-6,8.6-6.3,11.7-6.1,13.3c0.1,0.4,0.2,0.7,0.3,1l1.9,27.5l7.1,11h7.5c-0.1,0.4-0.1,0.9-0.1,1.3c0,4.3,2.6,7.8,5.9,7.8H114c3.2,0,5.9-3.5,5.9-7.8c0-0.5,0-0.9-0.1-1.3h16.4c-0.1,0.4-0.1,0.9-0.1,1.3c0,4.3,2.6,7.8,5.9,7.8h14.9c3.2,0,5.9-3.5,5.9-7.8c0-0.5,0-0.9-0.1-1.3h16.4c-0.1,0.4-0.1,0.9-0.1,1.3c0,4.3,2.6,7.8,5.9,7.8h14.9c3.2,0,5.9-3.5,5.9-7.8c0-0.5,0-0.9-0.1-1.3h9.5l4.7-11.6l2-26.1C221.5,416.3,221.7,409,215.9,401.3z M117.4,455.6c0,2.5-1.5,4.6-3.4,4.6H99.1c-1.9,0-3.4-2.1-3.4-4.6c0-0.5,0.1-0.9,0.2-1.3h21.4C117.3,454.7,117.4,455.1,117.4,455.6z M118.7,451.1c-1.1-2-2.8-3.3-4.7-3.3H99.1c-2,0-3.7,1.3-4.7,3.3h-7.4l-5.9-9.1l-1.9-28l-0.2-0.1c0.1-0.8,0.8-3.5,5.5-10.2c6.6-9.4,9-9.5,8.9-9.6l30.3,0.1l0.1,0l0.2-0.1c0,0,2.2-0.4,6.6,7.2c4.9,8.3,4.9,12.6,4.9,12.7v26c-1.3,1.4-4.5,5.4-5.2,11.1H118.7z M160.2,455.6c0,2.5-1.5,4.6-3.4,4.6h-14.9c-1.9,0-3.4-2.1-3.4-4.6c0-0.5,0.1-0.9,0.2-1.3H160C160.1,454.7,160.2,455.1,160.2,455.6z M161.5,451.1c-1.1-2-2.8-3.3-4.7-3.3h-14.9c-2,0-3.7,1.3-4.7,3.3h-4.3c0.9-5.3,4.6-9,4.7-9l0.5-0.5l0-27.5c0-0.5,0-5.5-5.4-14.7c-0.2-0.3-0.4-0.6-0.5-0.8h33.5c-4.8,7.1-4.3,12.8-4.3,12.8v30.9l0.6,0.5c1.4,1.2,4.7,4.7,5.1,8.4H161.5z M202.9,455.6c0,2.5-1.5,4.6-3.4,4.6h-14.9c-1.9,0-3.4-2.1-3.4-4.6c0-0.5,0.1-0.9,0.2-1.3h21.4C202.8,454.7,202.9,455.1,202.9,455.6zM217.2,441.4l-3.9,9.6h-9.1c-1.1-2-2.8-3.3-4.7-3.3h-14.9c-2,0-3.7,1.3-4.7,3.3h-10.6c-0.3-5.1-4.2-9.2-5.6-10.6l0-29.4c0-0.2-0.4-4.8,4-11c4.2-5.9,6.2-5.8,6.3-5.8h31.7c0.9,0.7,4.2,3.4,8.7,9.3c5,6.6,4.8,12.6,4.8,12.8L217.2,441.4z"/>
                <g id="seatBeltStatusDriverRear" class="seatBelt ${leftRearSeatBelt?"":"alert"}">
                    <polygon points="89.1,445.2 89.8,445.2 86.1,406.4"/>
                    <path d="M90.1,431.3c14.4-2.8,34.6-0.1,34.6-0.1s-8-2-17.7-2S90.1,431.3,90.1,431.3z"/>
                    <polygon points="125.6,445.2 128.6,406.4 124.8,445.2"/>
                </g>
                <g id="seatBeltStatusPassengerRear" class="seatBelt ${rightRearSeatBelt?"":"alert"}">
                    <polygon points="173.3,445.2 174.1,445.2 170.3,406.4"/>
                    <path d="M174.3,431.3c14.4-2.8,34.6-0.1,34.6-0.1s-8-2-17.7-2S174.3,431.3,174.3,431.3z"/>
                    <polygon points="209.8,445.2 212.8,406.4 209,445.2"/>
                </g>
            </g>
            <g>
                <path d="M137.4,310.9l-0.5-0.2l-0.5,0.3c-0.8,0.5-1.6,1-2.5,1.5l2.8-25.2c0.2-0.7,0.5-2.3-0.6-5.1c-1.1-3.2-10.3-16.7-12.4-18c-2-1.2-3.1-1-3.1-1h-15.4v0l-12,0c-0.3-0.1-1.4-0.3-3.4,0.9c-2.2,1.3-11.3,14.8-12.4,18c-1,2.9-0.8,4.4-0.6,5.1l2.9,25.4c-0.8-0.5-1.7-1-2.5-1.6l-0.5-0.3l-0.5,0.2c-0.8,0.3-2.2,1.8-2.2,8.3c0,6.6,1.1,9,1.3,9.3l0.3,0.4c0.3,0.3,8,7.2,16.4,9.5l0.6,0.2l2.6-3.1h23l2.6,3.1l0.6-0.2c8.4-2.2,16.1-9.2,16.4-9.5l0.3-0.4c0.1-0.3,1.3-2.7,1.3-9.3C139.6,312.8,138.2,311.3,137.4,310.9zM79.2,286.7l0-0.2l-0.1-0.2c0,0-0.3-0.9,0.5-3.2c1.1-3,10-15.8,11.4-16.6c1.2-0.7,1.8-0.7,2-0.7h15.4v0l12.5,0c0,0,0.6-0.1,1.8,0.7c1.4,0.9,10.3,13.6,11.4,16.6c0.8,2.2,0.6,3.1,0.6,3.1c0,0,0,0,0,0l-3.2,27.4c-11.2,5-24.2,5-24.5,5c-0.2,0-13.2,1-24.9-4.8l0.1,0L79.2,286.7z M136.4,327c-1.2,1.1-7.8,6.6-14.7,8.6l-2.3-2.9h-25l-2.3,2.9c-6.9-2.1-13.5-7.5-14.7-8.6c-0.2-0.6-0.9-2.9-0.9-7.8c0-3.1,0.3-4.7,0.6-5.4c13.2,8.6,29.5,7.4,30.1,7.4c0.7,0,17.2,0.1,29.6-7.4c0.3,0.7,0.6,2.3,0.6,5.4C137.3,324.1,136.6,326.4,136.4,327z"/>
                <g id="seatBeltStatusDriver" class="seatBelt ${leftFrontSeatBelt?"":"alert"}">
                    <polygon points="88.2,314.8 89,314.8 85.2,281.2"/>
                    <path d="M89,296c0,0,7.3-1.8,17.2-1.8s17.9,1.7,17.9,1.7S103.7,293.6,89,296z"/>
                    <polygon points="125.2,314.8 124.5,314.8 128.3,281.2"/>
                </g>
                <polygon points="125,325.5 122.9,320.8 123.3,325.5 123.2,325.8 114.6,322.5 108.1,322.5 105.3,322.5 98.8,322.5 90.3,325.8 90.1,325.5 90.5,320.8 88.4,325.5 94.6,333.9 90.7,326.5 98.5,324.1 105.3,324.1 108.1,324.1 115,324.1 122.8,326.5 118.8,333.9 "/>
                <path d="M221.6,310.9l-0.5-0.2l-0.5,0.3c-0.8,0.5-1.6,1-2.5,1.5l2.8-25.2c0.2-0.7,0.5-2.3-0.6-5.1c-1.1-3.2-10.3-16.7-12.4-18c-2-1.2-3.1-1-3.1-1h-15.4v0l-12,0c-0.3-0.1-1.4-0.3-3.4,0.9c-2.2,1.3-11.3,14.8-12.4,18c-1,2.9-0.8,4.4-0.6,5.1l2.9,25.4c-0.8-0.5-1.7-1-2.5-1.6l-0.5-0.3l-0.5,0.2c-0.8,0.3-2.2,1.8-2.2,8.3c0,6.6,1.1,9,1.3,9.3l0.3,0.4c0.3,0.3,8,7.2,16.4,9.5l0.6,0.2l2.6-3.1h23l2.6,3.1l0.6-0.2c8.4-2.2,16.1-9.2,16.4-9.5l0.3-0.4c0.1-0.3,1.3-2.7,1.3-9.3C223.8,312.8,222.4,311.3,221.6,310.9z M163.4,286.7l0-0.2l-0.1-0.2c0,0-0.3-0.9,0.5-3.2c1.1-3,10-15.8,11.4-16.6c1.2-0.7,1.8-0.7,2-0.7h15.4v0l12.5,0c0,0,0.6-0.1,1.8,0.7c1.4,0.9,10.3,13.6,11.4,16.6c0.8,2.2,0.6,3.1,0.6,3.1c0,0,0,0,0,0l-3.2,27.4c-11.2,5-24.2,5-24.5,5c-0.2,0-13.2,1-24.9-4.8l0.1,0L163.4,286.7z M220.6,327c-1.2,1.1-7.8,6.6-14.7,8.6l-2.3-2.9h-25l-2.3,2.9c-6.9-2.1-13.5-7.5-14.7-8.6c-0.2-0.6-0.9-2.9-0.9-7.8c0-3.1,0.3-4.7,0.6-5.4c13.2,8.6,29.5,7.4,30.1,7.4c0.7,0,17.2,0.1,29.6-7.4c0.3,0.7,0.6,2.3,0.6,5.4C221.5,324.1,220.8,326.4,220.6,327z"/>
                <g id="seatBeltStatusPassenger" class="seatBelt ${rightFrontSeatBelt?"":"alert"}">
                    <polygon points="172.4,314.8 173.1,314.8 169.3,281.2"/>
                    <path d="M173.2,296c0,0,7.3-1.8,17.2-1.8s17.9,1.7,17.9,1.7S187.9,293.6,173.2,296z"/>
                    <polygon points="209.4,314.8 208.6,314.8 212.4,281.2"/>
                </g>
                <polygon points="209.2,325.5 207.1,320.8 207.5,325.5 207.3,325.8 198.8,322.5 192.3,322.5 189.5,322.5 183,322.5 174.4,325.8 174.3,325.5 174.7,320.8 172.6,325.5 178.8,333.9 174.8,326.5 182.6,324.1 189.5,324.1 192.3,324.1 199.1,324.1 206.9,326.5 203,333.9 "/>
            </g>
        </g>
        <g id="车轮">
            <path id="engineHoodOpenStatus" class="enginehood${engineHoodStatus?" alert":""}" d="M248.7,170.8l-17.4-25.3c0,0-26.8-16.4-82.1-16.4h-0.1c-55.2,0-82.1,16.4-82.1,16.4l-17.4,25.3l3.6-85.3c1.4-19,9.6-39.9,9.6-39.9c16.2-34,53-39.9,53-39.9h33.2h0.1h33.2c0,0,36.8,5.9,53.1,39.9c0,0,8.2,20.9,9.5,39.9L248.7,170.8z"/>
            <path id="trunkOpenStatus" class="trunk${trunkStatus?" alert":""}" d="M217.8,581.4c-21.1,10.2-68.5,9.9-68.5,9.9h-0.1c0,0-47.4,0.3-68.5-9.9c-15.3-7.4-21.2-17.7-23.3-22.8c-0.8-2-1.1-3.1-1.1-3.1S50.7,534.1,53,516l0.4-0.2c3.5,6,29.2,6.2,29.2,6.2h66.6l0.1,0h66.6c0,0,25.8-0.2,29.3-6.2l0.4,0.2c2.3,18.1-3.3,39.4-3.3,39.4s-0.3,1.2-1.1,3.1C239,563.7,233,574,217.8,581.4z"/>
            <path id="tyrePreWarningPassenger" class="tyre ${statusActive(tyrePassenger)?" alert":""}" d="M267.6,282.6l-0.1,29.9l1.6-0.1c0,0,3-12.2,2.6-17.9c-0.4-5.7-2.1-12.6-2.1-12.6L267.6,282.6z"/>
            <path id="tyrePreWarningPassengerRear" class="tyre ${statusActive(tyrePassengerRear)?" alert":""}" d="M266.2,425.9l1,21.5l0.9,0.7c0,0,3.1-3.1,2.2-12.4s-2.3-10.3-2.3-10.3 L266.2,425.9"/>
            <path id="tyrePreWarningDriver" class="tyre ${statusActive(tyreDriver)?" alert":""}" d="M30.9,282.6l0.3,30l-1.4,0.5c0,0-3.7-1.8-3.1-16.1s2.6-15.5,2.6-15.5L30.9,282.6"/>
            <path id="tyrePreWarningDriverRear" class="tyre ${statusActive(tyreDriverRear)?" alert":""}" d="M31.3,447.4l0.8-21.5l-1.6-0.8c0,0-2.2-0.4-2.5,9.9c-0.3,10.4,1.4,13,1.4,13L31.3,447.4"/>
        </g>

        <g id="bulbStatus">
            <path class="st4" d="M245.3,73.6c0,0-3.9-23.6-6.7-30.4c0,0,6.6-0.8,8.4,4.1c0,0,4,15.7,2.2,25.9L245.3,73.6z"/>
            <path class="st4" d="M53.2,73.6c0,0,3.9-23.6,6.7-30.4c0,0-6.6-0.8-8.4,4.1c0,0-4,15.7-2.2,25.9L53.2,73.6z"/>
        </g>
        <g id="车门">
            <g id="doorOpenStatusPassengerRear" 
                class="${rightRearDoor?"on":"off"}">
                <path id="winStatusPassengerRear" class="win${rightRearWindow?" alert":""}" d="M256.8,342.7v0.2l-3.3,97.4l-11.5,11c-1.2-12.2-1.2-23.4-1.2-23.4l0.3-77.8h0.1C241,350,251.5,346.7,256.8,342.7z"/>
                <path class="${rightRearDoorLock?"lock":"unlock"}" d="M268.5,424.4l1.1-100.1v-0.4h-1.1l0-0.1l-0.1,0.1h-0.9l0,0.5l-9.6,5.9l0,0l-0.7,0.5l0,0l0,0l0,0c-0.1,0.1-8.1,5.3-16.3,8.3l-0.3,0.1l-0.3,88.6c0,0.1,0,11.3,1.2,23.4c0,0.7,0.1,1.4,0.2,2.1c1.2,11,3,19,5.4,23.9l0.1,0.1c0.1,0.1,1.3,1.3,2.8,1.3c0.1,0,0.3,0,0.4,0c0.9-0.1,1.6-0.7,2.1-1.8c1-0.6,11-6.6,15.9-13.9l-0.7-0.5c-4.3,6.4-12.7,11.8-15.1,13.2l1.2-35.3l0,0l0,0l3.4-97.6l0.6-11.4l9.6-5.9l-1.1,99.5l-0.2,0.9l0.9,0.1c0,0,2,1.1,2,10.4c0,8.3-1,10.4-1.3,10.9l-0.7,0v14.7h2.1V449c1.3-1.4,2-5.6,2-12.5C271.3,428.1,269.6,425.3,268.5,424.4z M256.9,332.1l-0.6,10.4c-4.5,3.4-12.9,6.3-14.9,6.9l0-9.6C248.2,337.4,254.7,333.4,256.9,332.1z M241.1,427.8l0.3-77.5c1.4-0.5,9.8-3.2,14.9-6.8l-3.3,96.4l-10.7,10.2C241.1,438.5,241.1,427.9,241.1,427.8z M252.9,442.7l-10.4,9.8c0-0.4-0.1-0.7-0.1-1.1l10.5-10.1L252.9,442.7z M250.2,477.8c-1,0.2-2.1-0.7-2.3-1c-2.3-4.8-4.1-12.6-5.3-23.2l10.2-9.6l-1.1,32.5C251.3,477.3,250.8,477.7,250.2,477.8z"/>
            </g>
            <g id="doorOpenStatusDriverRear" 
                class="${leftRearDoor?"on":"off"}">
                <path id="winStatusDriverRear" class="win${leftRearWindow?" alert":""}" d="M41.7,342.7v0.2l3.3,97.4l11.5,11c1.2-12.2,1.2-23.4,1.2-23.4L57.6,350h-0.1C57.4,350,46.9,346.7,41.7,342.7z"/>
                <path class="${leftRearDoorLock?"lock":"unlock"}" d="M58,350l0-10.8l-0.3-0.1c-8.3-3-16.2-8.2-16.3-8.3l0,0l0,0l0,0l-0.7-0.5l0,0l-9.6-5.9l0-0.1v-0.4h-0.9l-0.1-0.1l0,0.1h-1.1L30,424.4c-1.2,0.9-2.8,3.7-2.8,12.1c0,7,0.7,11.1,2,12.5v13.2h2.1v-14.7l-0.7,0c-0.3-0.5-1.3-2.7-1.3-10.9c0-9.2,2-10.4,1.9-10.4l0.9-0.1l-1.1-100.4l9.6,5.9l0.6,11.2l4.6,133.1c-2.4-1.5-10.7-6.9-15-13.2l-0.7,0.5c4.9,7.3,15,13.3,15.9,13.9c0.6,1,1.3,1.6,2.1,1.8c0.1,0,0.3,0,0.4,0c1.5,0,2.7-1.2,2.8-1.3l0.1-0.1c2.4-4.8,4.2-12.7,5.4-23.9l0.2-2.1c1.2-12.1,1.2-23.4,1.2-23.5L58,350z M57.1,339.8l0,9.5c-2.1-0.7-10.4-3.6-14.9-6.9l-0.5-10.4C43.8,333.4,50.3,337.4,57.1,339.8z M56,452.5l-10.4-9.8l0-1.4l10.5,10.1L56,452.5z M50.6,476.8c-0.2,0.2-1.3,1.1-2.3,1c-0.6-0.1-1.1-0.5-1.5-1.3L45.7,444l10.2,9.6C54.7,464.4,52.9,472.2,50.6,476.8z M56.2,450.3l-10.7-10.2l-3.3-96.5c5,3.5,13.4,6.3,14.9,6.7l0.3,77.5C57.4,427.9,57.3,438.5,56.2,450.3z"/>
            </g>
            <g id="doorOpenStatusPassenger" class="${rightFrontDoor?"on":"off"}">
                <path id="winStatusPassenger" class="win${rightFrontWindow?" alert":""}" d="M257.4,204v111.3h-0.1c-4.5,7.6-16.3,13.2-16.3,13.2v-43.3c0,0,1.1-48.5,12.4-81.8c0,0,0.8-0.8,1.8-0.9C255.9,202.4,256.7,202.7,257.4,204z"/>
                <path class="${rightFrontDoorLock?"lock":"unlock"}" d="M295.2,214.7c-3.9-6.3-10.5-15-20.1-20.5l-0.2-0.1c-1.3-0.8-4.3-1.3-5.9-1.5v-16.4h-2.1v0.5c-1.9,0.1-6.1,0.6-11.9,3.4l-0.3,0.1v22.1c-1,0.2-1.7,0.9-1.7,1l-0.1,0.2c-11.2,32.9-12.5,81.4-12.5,81.9v55l0.6-0.2c8.3-3,16.3-8.2,16.5-8.4c0,0,0,0,0,0l11.3-7c0.2-0.1,0.2-0.3,0.2-0.5h0.5v-10.3c1.2-1.2,3.1-5,3.1-17.2c0-11-1.4-14.9-2.9-16v-58.9l20.5,12.3c1,0.5,1.9,0.7,2.7,0.7c2.4,0,3.9-1.7,4.5-2.9C300.7,224.8,295.5,215.2,295.2,214.7z M253.8,203.6c0.2-0.2,0.8-0.7,1.5-0.7c0.6-0.1,1.2,0.4,1.7,1.2v111l0,0c-3.8,6.4-13,11.4-15.5,12.7v-42.6C241.4,284.7,242.6,236.4,253.8,203.6z M241.4,338.9v-10.1c1.7-0.8,11-5.6,15.5-12.1V331C255.6,331.8,248.7,336.1,241.4,338.9z M295.5,230.9c-0.2,0.4-1.5,2.6-4.3,1.3l-21.5-12.9v-0.8h-2.1v62.9l-0.2,1h1.1c0,0,2.1,1.3,2.1,14.3c0,13.7-2.4,15.6-2.3,15.6c0,0,0,0,0,0l-0.7,0.2v11.6h0.5l-10.2,6.3V204l-0.1-0.2c-0.6-1.2-1.4-1.6-2.1-1.7v-21.4c5.4-2.6,9.4-3.1,11.2-3.2v17l0.9,0.1c1.8,0.2,4.9,0.7,6,1.4l0.3,0.2c9.2,5.3,15.6,13.7,19.4,19.8C293.4,215.9,298.3,224.9,295.5,230.9z"/>
            </g>
            <g id="doorOpenStatusDriver" class="${leftFrontDoor?"on":"off"}">
                <path id="winStatusDriver" class="win${leftFrontWindow?" alert":""}" d="M41.1,315.3V204c0.7-1.2,1.5-1.5,2.2-1.5c1,0.1,1.8,0.9,1.8,0.9c11.3,33.2,12.4,81.8,12.4,81.8v43.3c0,0-11.8-5.6-16.3-13.2H41.1z"/>
                <path class="${leftFrontDoorLock?"lock":"unlock"}" d="M45.5,203.2l-0.1-0.2c0,0-0.8-0.7-1.7-1V180l-0.3-0.1c-5.7-2.8-9.9-3.3-11.9-3.4v-0.5h-2.1v16.4c-1.6,0.2-4.5,0.7-5.8,1.5l-0.3,0.1c-9.6,5.5-16.3,14.2-20.1,20.6c-0.2,0.4-5.5,10-2.2,17.1c0.6,1.2,2.1,2.8,4.5,2.8c0.8,0,1.8-0.2,2.8-0.7l20.4-12.2v58.9c-1.5,1.1-2.9,5-2.9,16c0,12.2,1.9,16,3.1,17.2v10.3h0.5c-0.1,0.2,0,0.4,0.2,0.5l11.3,6.9c0.1,0.1,8.2,5.4,16.5,8.4l0.6,0.2v-55C58,284.7,56.8,236.2,45.5,203.2z M57.1,285.2v42.6c-2.5-1.3-11.7-6.3-15.5-12.7l0,0v-111c0.6-1.1,1.3-1.2,1.7-1.2c0.7,0.1,1.3,0.6,1.5,0.7C55.9,236.4,57.1,284.7,57.1,285.2z M30.4,312.4c0,0-2.5-1.8-2.5-15.7c0-12.7,2-14.2,1.9-14.2h1.1v-64h-2.1v0.8L7.4,232.2c-2.9,1.4-4.2-0.8-4.4-1.2c-2.8-6.1,2.1-15.1,2.1-15.1c3.7-6.1,10.1-14.5,19.4-19.8l0.3-0.2c1-0.6,4.2-1.2,5.9-1.4l0.9-0.1v-17c1.8,0.1,5.8,0.5,11.2,3.2V202c-0.9,0.1-1.6,0.7-2.1,1.7l-0.1,126.6l-10.2-6.3H31v-10.8l0.1-0.7L30.4,312.4z M41.6,331v-14.3c4.5,6.5,13.8,11.3,15.5,12.1v10.1C49.8,336.1,42.8,331.8,41.6,331z"/>
            </g>
            <polygon id="sunroofOpenStatus" class="sunroof${sunroofStatus?" alert":""}" points="226.9,365.7 71.6,365.7 73.1,437.7 225.3,437.7 	"/>
        </g>
        </svg> 
            </div>
            <div id="right">
                <div id="speedbox" class="radiusbox">
                    <div class="rabiusboxline">
                        <svg version="1.1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 600 600" style="enable-background:new 0 0 600 600;" xml:space="preserve">
                            <path class="svgrabiusboxline" d="M300,0c-43.6,0-85,9.3-122.5,26c-4.3,2.1-8.6,4.2-13,6.2c-66.9,30.7-141,48.7-258,50.7v433.3
                        c112.5,1.9,182.5,18,246.4,45.6c12.4,5.3,24.5,11.1,36.4,17.3c34.3,13.6,71.6,21,110.6,21c165.7,0,300-134.3,300-300S465.7,0,300,0
                        z"/>
                        <g id="speenlines">
                        <path class="status ${rightGauge*0.5>1?"active":""}" d="M117.7,476.4c-1.1-1.2-2.3-2.4-3.4-3.6l-21.1,19c1.4,1.6,2.9,3.1,4.4,4.6L117.7,476.4z"/>
                        <path class="status ${rightGauge*0.5>2?"active":""}" d="M108.7,466.6c-1.1-1.2-2.1-2.5-3.2-3.7l-22.1,17.9c1.4,1.6,2.7,3.3,4.1,4.9L108.7,466.6z"/>
                        <path class="status ${rightGauge*0.5>3?"active":""}" d="M100.3,456.3c-1-1.3-2-2.6-3-3.9l-23,16.7c1.3,1.7,2.6,3.4,3.9,5.1L100.3,456.3z"/>
                        <path class="status ${rightGauge*0.5>4?"active":""}" d="M92.4,445.7c-0.9-1.3-1.9-2.7-2.8-4l-23.8,15.5c1.2,1.8,2.4,3.5,3.6,5.3L92.4,445.7z"/>
                        <path class="status ${rightGauge*0.5>5?"active":""}" d="M85,434.6c-0.9-1.4-1.7-2.8-2.6-4.2l-24.6,14.2c1.1,1.8,2.2,3.6,3.3,5.4L85,434.6z"/>
                        <path class="status ${rightGauge*0.5>6?"active":""}" d="M78.3,423.2c-0.8-1.4-1.6-2.9-2.3-4.3l-25.3,12.9c1,1.9,2,3.8,3.1,5.6L78.3,423.2z"/>
                        <path class="status ${rightGauge*0.5>7?"active":""}" d="M72.1,411.4c-0.7-1.5-1.4-2.9-2.1-4.4l-26,11.6c0.9,1.9,1.8,3.9,2.8,5.8L72.1,411.4z"/>
                        <path class="status ${rightGauge*0.5>8?"active":""}" d="M66.6,399.3c-0.6-1.5-1.3-3-1.9-4.5L38.2,405c0.8,2,1.6,3.9,2.4,5.9L66.6,399.3z"/>
                        <path class="status ${rightGauge*0.5>9?"active":""}" d="M61.7,387c-0.6-1.5-1.1-3.1-1.6-4.6l-27,8.8c0.7,2,1.4,4,2.1,6L61.7,387z"/>
                        <path class="status ${rightGauge*0.5>10?"active":""}" d="M57.5,374.4c-0.5-1.6-0.9-3.1-1.4-4.7l-27.5,7.4c0.6,2.1,1.2,4.1,1.8,6.1L57.5,374.4z"/>
                        <path class="status ${rightGauge*0.5>11?"active":""}" d="M53.9,361.6c-0.4-1.6-0.8-3.2-1.2-4.8L25,362.7c0.5,2.1,1,4.1,1.5,6.2L53.9,361.6z"/>
                        <path class="status ${rightGauge*0.5>12?"active":""}" d="M51,348.6c-0.3-1.6-0.6-3.2-0.9-4.8l-28.1,4.4c0.4,2.1,0.8,4.2,1.2,6.3L51,348.6z"/>
                        <path class="status ${rightGauge*0.5>13?"active":""}" d="M48.9,335.5c-0.2-1.6-0.4-3.2-0.6-4.9l-28.3,3c0.3,2.1,0.5,4.2,0.8,6.3L48.9,335.5z"/>
                        <path class="status ${rightGauge*0.5>14?"active":""}" d="M47.4,322.3c-0.1-1.6-0.3-3.2-0.4-4.9l-28.4,1.5c0.1,2.1,0.3,4.2,0.5,6.4L47.4,322.3z"/>
                        <path class="status ${rightGauge*0.5>15?"active":""}" d="M46.5,309.1c-0.1-1.6-0.1-3.3-0.1-4.9H18c0,2.1,0.1,4.3,0.2,6.4L46.5,309.1z"/>
                        <path class="status ${rightGauge*0.5>16?"active":""}" d="M46.4,295.8c0-1.6,0.1-3.3,0.1-4.9l-28.4-1.5c-0.1,2.1-0.1,4.2-0.2,6.4H46.4z"/>
                        <path class="status ${rightGauge*0.5>17?"active":""}" d="M47,282.5c0.1-1.6,0.2-3.3,0.4-4.9l-28.3-3c-0.2,2.1-0.4,4.2-0.5,6.4L47,282.5z"/>
                        <path class="status ${rightGauge*0.5>18?"active":""}" d="M48.2,269.3c0.2-1.6,0.4-3.2,0.6-4.9L20.8,260c-0.3,2.1-0.6,4.2-0.8,6.3L48.2,269.3z"/>
                        <path class="status ${rightGauge*0.5>19?"active":""}" d="M50.1,256.2c0.3-1.6,0.6-3.2,0.9-4.8l-27.8-5.9c-0.4,2.1-0.8,4.2-1.2,6.3L50.1,256.2z"/>
                        <path class="status ${rightGauge*0.5>20?"active":""}" d="M52.8,243.2c0.4-1.6,0.8-3.2,1.2-4.8L26.5,231c-0.5,2.1-1,4.1-1.5,6.2L52.8,243.2z"/>
                        <path class="status ${rightGauge*0.5>21?"active":""}" d="M56.1,230.3c0.4-1.6,0.9-3.1,1.4-4.7l-27-8.8c-0.6,2-1.2,4.1-1.8,6.1L56.1,230.3z"/>
                        <path class="status ${rightGauge*0.5>22?"active":""}" d="M60,217.6c0.5-1.5,1.1-3.1,1.6-4.6l-26.5-10.2c-0.7,2-1.4,4-2.1,6L60,217.6z"/>
                        <path class="status ${rightGauge*0.5>23?"active":""}" d="M64.7,205.2c0.6-1.5,1.2-3,1.9-4.5l-26-11.6c-0.8,2-1.6,3.9-2.4,5.9L64.7,205.2z"/>
                        <path class="status ${rightGauge*0.5>24?"active":""}" d="M70,193c0.7-1.5,1.4-3,2.1-4.4l-25.3-12.9c-0.9,1.9-1.9,3.8-2.8,5.8L70,193z"/>
                        <path class="status ${rightGauge*0.5>25?"active":""}" d="M75.9,181.1c0.8-1.4,1.5-2.9,2.3-4.3l-24.6-14.2c-1,1.9-2.1,3.7-3.1,5.6L75.9,181.1z"/>
                        <path class="status ${rightGauge*0.5>26?"active":""}" d="M82.4,169.6c0.8-1.4,1.7-2.8,2.6-4.2l-23.8-15.5c-1.1,1.8-2.2,3.6-3.3,5.4L82.4,169.6z"/>
                        <path class="status ${rightGauge*0.5>27?"active":""}" d="M89.6,158.3c0.9-1.4,1.8-2.7,2.8-4l-23-16.7c-1.2,1.7-2.4,3.5-3.6,5.3L89.6,158.3z"/>
                        <path class="status ${rightGauge*0.5>28?"active":""}" d="M97.3,147.5c1-1.3,2-2.6,3-3.9l-22.1-17.9c-1.3,1.7-2.6,3.4-3.9,5.1L97.3,147.5z"/>
                        <path class="status ${rightGauge*0.5>29?"active":""}" d="M105.6,137.2c1-1.3,2.1-2.5,3.2-3.7l-21.1-19c-1.4,1.6-2.8,3.2-4.1,4.9L105.6,137.2z"/>
                        <path class="status ${rightGauge*0.5>30?"active":""}" d="M114.4,127.2c1.1-1.2,2.2-2.4,3.4-3.6l-20.1-20.1c-1.5,1.5-2.9,3.1-4.4,4.6L114.4,127.2z"/>
                        <path class="status ${rightGauge*0.5>31?"active":""}" d="M123.7,117.7c1.2-1.1,2.4-2.3,3.6-3.4l-19-21.1c-1.6,1.4-3.1,2.9-4.6,4.4L123.7,117.7z"/>
                        <path class="status ${rightGauge*0.5>32?"active":""}" d="M133.4,108.7c1.2-1.1,2.5-2.1,3.7-3.2l-17.9-22.1c-1.6,1.4-3.3,2.7-4.9,4.1L133.4,108.7z"/>
                        <path class="status ${rightGauge*0.5>33?"active":""}" d="M143.7,100.3c1.3-1,2.6-2,3.9-3l-16.7-23c-1.7,1.3-3.4,2.6-5.1,3.9L143.7,100.3z"/>
                        <path class="status ${rightGauge*0.5>34?"active":""}" d="M154.3,92.4c1.3-0.9,2.7-1.9,4-2.8l-15.5-23.8c-1.8,1.2-3.5,2.4-5.3,3.6L154.3,92.4z"/>
                        <path class="status ${rightGauge*0.5>35?"active":""}" d="M165.4,85c1.4-0.9,2.8-1.7,4.2-2.6l-14.2-24.6c-1.8,1.1-3.6,2.2-5.4,3.3L165.4,85z"/>
                        <path class="status ${rightGauge*0.5>36?"active":""}" d="M176.8,78.3c1.4-0.8,2.9-1.6,4.3-2.3l-12.9-25.3c-1.9,1-3.8,2-5.6,3.1L176.8,78.3z"/>
                        <path class="status ${rightGauge*0.5>37?"active":""}" d="M188.6,72.1c1.5-0.7,2.9-1.4,4.4-2.1l-11.6-26c-1.9,0.9-3.9,1.8-5.8,2.8L188.6,72.1z"/>
                        <path class="status ${rightGauge*0.5>38?"active":""}" d="M200.7,66.6c1.5-0.6,3-1.3,4.5-1.9L195,38.2c-2,0.8-3.9,1.6-5.9,2.4L200.7,66.6z"/>
                        <path class="status ${rightGauge*0.5>39?"active":""}" d="M213,61.7c1.5-0.6,3.1-1.1,4.6-1.6l-8.8-27c-2,0.7-4,1.4-6,2.1L213,61.7z"/>
                        <path class="status ${rightGauge*0.5>40?"active":""}" d="M225.6,57.5c1.6-0.5,3.1-0.9,4.7-1.4l-7.4-27.5c-2.1,0.6-4.1,1.2-6.1,1.8L225.6,57.5z"/>
                        <path class="status ${rightGauge*0.5>41?"active":""}" d="M238.4,53.9c1.6-0.4,3.2-0.8,4.8-1.1L237.3,25c-2.1,0.5-4.1,1-6.2,1.5L238.4,53.9z"/>
                        <path class="status ${rightGauge*0.5>42?"active":""}" d="M251.4,51c1.6-0.3,3.2-0.6,4.8-0.9l-4.4-28.1c-2.1,0.4-4.2,0.8-6.3,1.2L251.4,51z"/>
                        <path class="status ${rightGauge*0.5>43?"active":""}" d="M264.5,48.9c1.6-0.2,3.2-0.4,4.9-0.6l-3-28.3c-2.1,0.3-4.2,0.5-6.3,0.8L264.5,48.9z"/>
                        <path class="status ${rightGauge*0.5>44?"active":""}" d="M277.7,47.4c1.6-0.1,3.2-0.3,4.9-0.4l-1.5-28.4c-2.1,0.1-4.2,0.3-6.4,0.5L277.7,47.4z"/>
                        <path class="status ${rightGauge*0.5>45?"active":""}" d="M290.9,46.5c1.6-0.1,3.3-0.1,4.9-0.1V18c-2.1,0-4.3,0.1-6.4,0.2L290.9,46.5z"/>
                        <path class="status ${rightGauge*0.5>46?"active":""}" d="M304.2,46.4c1.6,0,3.3,0.1,4.9,0.1l1.5-28.4c-2.1-0.1-4.2-0.1-6.4-0.2V46.4z"/>
                        <path class="status ${rightGauge*0.5>47?"active":""}" d="M317.5,47c1.6,0.1,3.3,0.2,4.9,0.4l3-28.3c-2.1-0.2-4.2-0.4-6.4-0.5L317.5,47z"/>
                        <path class="status ${rightGauge*0.5>48?"active":""}" d="M330.7,48.2c1.6,0.2,3.2,0.4,4.9,0.6l4.4-28.1c-2.1-0.3-4.2-0.6-6.3-0.8L330.7,48.2z"/>
                        <path class="status ${rightGauge*0.5>49?"active":""}" d="M343.8,50.1c1.6,0.3,3.2,0.6,4.8,0.9l5.9-27.8c-2.1-0.4-4.2-0.8-6.3-1.2L343.8,50.1z"/>
                        <path class="status ${rightGauge*0.5>50?"active":""}" d="M356.8,52.8c1.6,0.4,3.2,0.8,4.8,1.2l7.4-27.5c-2.1-0.5-4.1-1-6.2-1.5L356.8,52.8z"/>
                        <path class="status ${rightGauge*0.5>51?"active":""}" d="M369.7,56.1c1.6,0.4,3.1,0.9,4.7,1.4l8.8-27c-2-0.6-4.1-1.2-6.1-1.8L369.7,56.1z"/>
                        <path class="status ${rightGauge*0.5>52?"active":""}" d="M382.4,60c1.5,0.5,3.1,1.1,4.6,1.6l10.2-26.5c-2-0.7-4-1.4-6-2.1L382.4,60z"/>
                        <path class="status ${rightGauge*0.5>53?"active":""}" d="M394.8,64.7c1.5,0.6,3,1.2,4.5,1.9l11.6-26c-2-0.8-3.9-1.6-5.9-2.4L394.8,64.7z"/>
                        <path class="status ${rightGauge*0.5>54?"active":""}" d="M407,70c1.5,0.7,3,1.4,4.4,2.1l12.9-25.3c-1.9-0.9-3.8-1.9-5.8-2.8L407,70z"/>
                        <path class="status ${rightGauge*0.5>55?"active":""}" d="M418.9,75.9c1.4,0.8,2.9,1.5,4.3,2.3l14.2-24.6c-1.9-1-3.7-2.1-5.6-3.1L418.9,75.9z"/>
                        <path class="status ${rightGauge*0.5>56?"active":""}" d="M430.4,82.4c1.4,0.8,2.8,1.7,4.2,2.6l15.5-23.8c-1.8-1.1-3.6-2.2-5.4-3.3L430.4,82.4z"/>
                        <path class="status ${rightGauge*0.5>57?"active":""}" d="M441.7,89.6c1.4,0.9,2.7,1.8,4,2.8l16.7-23c-1.7-1.2-3.5-2.4-5.3-3.6L441.7,89.6z"/>
                        <path class="status ${rightGauge*0.5>58?"active":""}" d="M452.5,97.3c1.3,1,2.6,2,3.9,3l17.9-22.1c-1.7-1.3-3.4-2.6-5.1-3.9L452.5,97.3z"/>
                        <path class="status ${rightGauge*0.5>59?"active":""}" d="M462.8,105.6c1.3,1,2.5,2.1,3.7,3.2l19-21.1c-1.6-1.4-3.2-2.8-4.9-4.1L462.8,105.6z"/>
                        <path class="status ${rightGauge*0.5>60?"active":""}" d="M472.8,114.4c1.2,1.1,2.4,2.2,3.6,3.4l20.1-20.1c-1.5-1.5-3.1-2.9-4.6-4.4L472.8,114.4z"/>
                        <path class="status ${rightGauge*0.5>61?"active":""}" d="M482.3,123.6c1.1,1.2,2.3,2.4,3.4,3.6l21.1-19c-1.4-1.6-2.9-3.1-4.4-4.6L482.3,123.6z"/>
                        <path class="status ${rightGauge*0.5>62?"active":""}" d="M491.3,133.4c1.1,1.2,2.1,2.5,3.2,3.7l22.1-17.9c-1.4-1.6-2.7-3.3-4.1-4.9L491.3,133.4z"/>
                        <path class="status ${rightGauge*0.5>63?"active":""}" d="M499.7,143.7c1,1.3,2,2.6,3,3.9l23-16.7c-1.3-1.7-2.6-3.4-3.9-5.1L499.7,143.7z"/>
                        <path class="status ${rightGauge*0.5>64?"active":""}" d="M507.6,154.3c0.9,1.3,1.9,2.7,2.8,4l23.8-15.5c-1.2-1.8-2.4-3.5-3.6-5.3L507.6,154.3z"/>
                        <path class="status ${rightGauge*0.5>65?"active":""}" d="M515,165.4c0.9,1.4,1.7,2.8,2.6,4.2l24.6-14.2c-1.1-1.8-2.2-3.6-3.3-5.4L515,165.4z"/>
                        <path class="status ${rightGauge*0.5>66?"active":""}" d="M521.7,176.8c0.8,1.4,1.6,2.9,2.3,4.3l25.3-12.9c-1-1.9-2-3.8-3.1-5.6L521.7,176.8z"/>
                        <path class="status ${rightGauge*0.5>67?"active":""}" d="M527.9,188.6c0.7,1.5,1.4,2.9,2.1,4.4l26-11.6c-0.9-1.9-1.8-3.9-2.8-5.8L527.9,188.6z"/>
                        <path class="status ${rightGauge*0.5>68?"active":""}" d="M533.4,200.7c0.6,1.5,1.3,3,1.9,4.5l26.5-10.2c-0.8-2-1.6-3.9-2.4-5.9L533.4,200.7z"/>
                        <path class="status ${rightGauge*0.5>69?"active":""}" d="M538.3,213c0.6,1.5,1.1,3.1,1.6,4.6l27-8.8c-0.7-2-1.4-4-2.1-6L538.3,213z"/>
                        <path class="status ${rightGauge*0.5>70?"active":""}" d="M542.5,225.6c0.5,1.6,0.9,3.1,1.4,4.7l27.5-7.4c-0.6-2.1-1.2-4.1-1.8-6.1L542.5,225.6z"/>
                        <path class="status ${rightGauge*0.5>71?"active":""}" d="M546.1,238.4c0.4,1.6,0.8,3.2,1.2,4.8l27.8-5.9c-0.5-2.1-1-4.1-1.5-6.2L546.1,238.4z"/>
                        <path class="status ${rightGauge*0.5>72?"active":""}" d="M549,251.4c0.3,1.6,0.6,3.2,0.9,4.8l28.1-4.4c-0.4-2.1-0.8-4.2-1.2-6.3L549,251.4z"/>
                        <path class="status ${rightGauge*0.5>73?"active":""}" d="M551.1,264.5c0.2,1.6,0.4,3.2,0.6,4.9l28.3-3c-0.3-2.1-0.5-4.2-0.8-6.3L551.1,264.5z"/>
                        <path class="status ${rightGauge*0.5>74?"active":""}" d="M580.9,274.7l-28.3,3c0.1,1.6,0.3,3.2,0.4,4.9l28.4-1.5C581.3,278.9,581.1,276.8,580.9,274.7z"/>
                        <path class="status ${rightGauge*0.5>75?"active":""}" d="M553.5,290.9c0.1,1.6,0.1,3.3,0.1,4.9H582c0-2.1-0.1-4.3-0.2-6.4L553.5,290.9z"/>
                        <path class="status ${rightGauge*0.5>76?"active":""}" d="M553.6,304.2c0,1.6-0.1,3.3-0.1,4.9l28.4,1.5c0.1-2.1,0.1-4.2,0.2-6.4H553.6z"/>
                        <path class="status ${rightGauge*0.5>77?"active":""}" d="M553,317.5c-0.1,1.6-0.2,3.3-0.4,4.9l28.3,3c0.2-2.1,0.4-4.2,0.5-6.4L553,317.5z"/>
                        <path class="status ${rightGauge*0.5>78?"active":""}" d="M551.8,330.7c-0.2,1.6-0.4,3.2-0.6,4.9l28.1,4.4c0.3-2.1,0.6-4.2,0.8-6.3L551.8,330.7z"/>
                        <path class="status ${rightGauge*0.5>79?"active":""}" d="M549.9,343.8c-0.3,1.6-0.6,3.2-0.9,4.8l27.8,5.9c0.4-2.1,0.8-4.2,1.2-6.3L549.9,343.8z"/>
                        <path class="status ${rightGauge*0.5>80?"active":""}" d="M547.2,356.8c-0.4,1.6-0.8,3.2-1.2,4.8l27.5,7.4c0.5-2.1,1-4.1,1.5-6.2L547.2,356.8z"/>
                        <path class="status ${rightGauge*0.5>81?"active":""}" d="M543.9,369.7c-0.4,1.6-0.9,3.1-1.4,4.7l27,8.8c0.6-2,1.2-4.1,1.8-6.1L543.9,369.7z"/>
                        <path class="status ${rightGauge*0.5>82?"active":""}" d="M540,382.4c-0.5,1.5-1.1,3.1-1.6,4.6l26.5,10.2c0.7-2,1.4-4,2.1-6L540,382.4z"/>
                        <path class="status ${rightGauge*0.5>83?"active":""}" d="M535.3,394.8c-0.6,1.5-1.2,3-1.9,4.5l26,11.6c0.8-2,1.6-3.9,2.4-5.9L535.3,394.8z"/>
                        <path class="status ${rightGauge*0.5>84?"active":""}" d="M530,407c-0.7,1.5-1.4,3-2.1,4.4l25.3,12.9c0.9-1.9,1.9-3.8,2.8-5.8L530,407z"/>
                        <path class="status ${rightGauge*0.5>85?"active":""}" d="M524.1,418.9c-0.8,1.4-1.5,2.9-2.3,4.3l24.6,14.2c1-1.9,2.1-3.7,3.1-5.6L524.1,418.9z"/>
                        <path class="status ${rightGauge*0.5>86?"active":""}" d="M517.6,430.4c-0.8,1.4-1.7,2.8-2.6,4.2l23.8,15.5c1.1-1.8,2.2-3.6,3.3-5.4L517.6,430.4z"/>
                        <path class="status ${rightGauge*0.5>87?"active":""}" d="M510.4,441.7c-0.9,1.4-1.8,2.7-2.8,4l23,16.7c1.2-1.7,2.4-3.5,3.6-5.3L510.4,441.7z"/>
                        <path class="status ${rightGauge*0.5>88?"active":""}" d="M502.7,452.5c-1,1.3-2,2.6-3,3.9l22.1,17.9c1.3-1.7,2.6-3.4,3.9-5.1L502.7,452.5z"/>
                        <path class="status ${rightGauge*0.5>89?"active":""}" d="M494.4,462.9c-1,1.3-2.1,2.5-3.2,3.7l21.1,19c1.4-1.6,2.8-3.2,4.1-4.9L494.4,462.9z"/>
                        <path class="status ${rightGauge*0.5>90?"active":""}" d="M485.6,472.8c-1.1,1.2-2.2,2.4-3.4,3.6l20.1,20.1c1.5-1.5,2.9-3.1,4.4-4.6L485.6,472.8z"/>
                        <path id="pointer" class="active" transform="rotate(${rightGauge*1.5-3} 300 300)" d="M117.7,476.4c70.6-68.7,53.7-55.1-3.4-3.6l-21.1,19c1.4,1.6,2.9,3.1,4.4,4.6L117.7,476.4z"/>
                    </g>
                            <text x="300" y="380" id="rightGauge">${rightGauge}</text>
                            <text x="430" y="210">${rightGaugeUnit}</text>
                            <text x="300" y="450">${subSensor1Text}</text>
                            <text x="300" y="530">${subSensor2Text}</text>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <ha-icon-button
        id="fitbutton" 
        icon="hass:image-filter-center-focus" 
        title="${fitTitle}" role="button" 
        tabindex="0" aria-disabled="false"
        @click="${this._fitView}"
        ></ha-icon-button>
    </ha-card>
</div>
`
    }
    _fitView(){
        if(!this.FitView){
            this.map.setFitView(this.path,false,[10,170,10,10]);
            this.map.setPitch(0);
            this.map.setRotation(0);
            this.FitView = true;
        }else{
            this.map.setPitch(80);
            this.map.setZoomAndCenter(20, this.location);
            this.map.setRotation(this.angle);
            this.FitView = false;
        } 
    }
    _addMarker(entity,angle){
        let objstates = this.hass.states[entity];
        let gps = new AMap.LngLat(objstates.attributes.longitude, objstates.attributes.latitude);
        let that = this;

        AMap.convertFrom(gps, "gps", function (status, result) {
            if (result.info === 'ok') {
                that._showMarker(result.locations[0],entity);
                // that.map.setFitView(that.marker, false, [20, 20, 20, 20]);
                that.map.setRotation(angle);
                that.angle = angle;
                that.location = result.locations[0];
                that.map.setCenter(result.locations[0]);
            }
        });
    }
    _showMarker(result,entity){
        let hours_to_show =this.config.hours_to_show||48;
        this.marker.setPosition(result);
        this._gethistory(hours_to_show, entity);
    }
    _gethistory(hours, entity){
        const endTime = new Date();
        const startTime = new Date();
        startTime.setHours(endTime.getHours() - hours);
        
        const that  = this;
        const url = "history/period/"+startTime.toISOString()+"?filter_entity_id="+entity+"&significant_changes_only=0&end_time="+endTime.toISOString();
        const req = this.hass.fetchWithAuth
            ? this.hass.fetchWithAuth("/api/"+url).then(r => r.json())
            : this.hass.callApi("GET", url);
        return req.then(function(res) {
          let arr = res[0];
          if (arr && arr.length > 1 && that.historyPath != arr.length) {
            that.historyPath = arr.length;
            var lineArr = [];
            for(var i in arr) {
              let p = arr[i].attributes;
              if(p.longitude)lineArr.push(new AMap.LngLat(p.longitude,p.latitude));
            }
            let clineArr = lineArr.slice(-1500);
            AMap.convertFrom(clineArr, "gps", function (status, result) {
                if (result.info === 'ok') {
                    var path2 = result.locations;
                    if( that.path){
                    that.path.setPath(path2);
                    }else{
                    that.path = new AMap.Polyline({
                        map: that.map,
                        path: path2,  
                        zIndex: 200,
                        strokeWeight: 3, 
                        strokeColor: "#4f94ff", 
                        strokeOpacity: 0.5,
                        lineJoin: 'round' 
                    });
        
                    for(var i=0;i<path2.length;i+=1){
                        var center = path2[i];
                        new AMap.CircleMarker({
                        map: that.map,
                        center:center,
                        strokeWeight:0,
                        radius:4,
                        fillColor:"#4f94ff",
                        fillOpacity:0.5,
                        zIndex:200,
                        bubble:true
                        });
                    }
                    }
        
                }
            });
          }
        });
    }
    static get styles() {
        return css `

            :host([is-panel]) ha-card {
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                position: absolute;
            }
            :host([is-panel]) #aspect-ratio {
                position: initial;
            }
            :host([is-panel]) #aspect-ratio::before {
                content: "";display: block;padding-bottom: 0;
            }
            :host([is-panel]) #container {
                height:40%;padding-bottom: 15%;background: var( --ha-card-background, var(--card-background-color, white) );
            }
            svg {width:100%;margin-top:10% 0;overflow: visible;z-index: 2;}
            text{font-size: 45px;fill: var(--secondary-text-color);text-anchor: middle;}
            #container.ON{
                --icon-color: var(--paper-item-icon-active-color);
                --box-shadow: 0 0 15px var(--paper-item-icon-active-color);
            }
            #container.OFF{
                --icon-color: var(--paper-item-icon-color);
                --box-shadow: 0 0 15px var(--paper-item-icon-color);
            }
            #aspect-ratio {position: relative;}
            
            #aspect-ratio>:first-child {position: absolute;top: 0;left: 0;height: 100%;width: 100%; overflow: hidden;}
            #container{
                height: 170px;
                width: 100%;
                display: flex;
                overflow: visible;
                position: absolute;
                bottom: 0;
                left: 0px;
                z-Index: 2;
                box-shadow: var(--box-shadow);
                background: var( --ha-card-background, var(--card-background-color, white) );
            }
            #container > *{flex:1;text-align: center;align-items: start;}
            #map{cursor: default;background-color: transparent;width: 100%;height: 100%;}
            #map > iframe{display: none;top: 0;left: 0;}
            #left {flex:2;display: flex;z-index: 1;}
            #center {flex:1;display: flex;z-index: 2;}
            #center > svg {margin-top:-50%}
            #centerbg {
                width: 30%;
                height: 59%;
                background: var( --ha-card-background, var(--card-background-color, white) );
                position: absolute;
                display: block;
                left: 35%;
                box-shadow: var(--box-shadow);
            }
            #right {flex:2;display: flex;z-index: 1;}
            #right .radiusbox {
                right:5%;
            }
            .amap-controls{
                top: 0;
                position: absolute;
            }
            .amap-container{
                height:100%;
            }
            .radiusbox {
                display: flex;
                position: relative;
                margin: -19% 5% -50%;
                width: 90%;
                border: 1px solid rgba(255, 255, 255, 0.09);
                border-radius: 50%;
                box-sizing: border-box;
                box-shadow: var(--box-shadow);
                background: var( --ha-card-background, var(--card-background-color, white) );
                flex-direction: column;
            }
            .rabiusboxline{
                width: 94%;
                height: 94%;
                border: 1px var(--box-shadow);
                border-style: dashed dashed dashed none;
                border-radius: 50%;
                margin:3%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                border-color: var(--primary-text-color);
            }
            .rabiusboxline > * {
                flex:1;
                display:-webkit-box;
                -webkit-box-align:center;
                -webkit-box-pack:center;
            }
            #left .radiusbox {
                left:5%;
            }
            #left .radiusbox .rabiusboxline{
                border-style: dashed none dashed dashed;
            }
            #exteriorTemp{
                font-size: 16.5em;
                fill:var(--primary-text-color);
                font-family: 'Six Caps','Amatic SC','Krona One', sans-serif;
            }
            #rightGauge {
                font-size: 16.5em;
                fill:var(--primary-text-color);
                font-family: 'Six Caps','Amatic SC','Krona One', sans-serif;
            }
            .subsensor-icon{
                --mdc-icon-size:22px;
                color:var(--secondary-text-color);
            }
            .unit{
                font-size: 0.8em;
                color: var(--secondary-text-color);
            }
            .svgrabiusboxline{
                fill: var( --ha-card-background, var(--card-background-color, white) );
            }
            .status{
                fill: var(--paper-item-icon-color);
                opacity:0.3;
                color: var(--paper-item-icon-color);
            }
            .status.active{
                color: var(--paper-item-icon-active-color);
            }
            .status ha-icon{
                color: inherit;
                --iron-icon-fill-color: currentColor;
            }
            .hidden{display:none;}

            .amap-logo{display: none;}
            .tyre,.enginehood,.trunk,.sunroof,.win{opacity:0.1;fill:#fff;}
            .tyre.alert,.enginehood.alert,.trunk.alert,.sunroof.alert,.win.alert{opacity:0.3;fill:#E60012;-webkit-animation: alert linear 2s;-webkit-animation-iteration-count: infinite;transform-box: fill-box !important;}
            .seatBelt.alert{fill:#E60012;}
            .unlock{fill:orange}
            .st4{fill:#CFD0D0;}
            .st2{fill:var( --ha-card-background, var(--card-background-color, white) )}
            ha-icon-button {
                position: absolute;
                top: 7px;
                left: 7px;
              }
            #doorOpenStatusDriverRear.off,#doorOpenStatusDriver.off{
                transform: none;
                -webkit-transform-origin: 50% 0 0 !important;
                transform-box: fill-box !important;
                -webkit-transition: transform 1s linear;
                transition: transform 1s linear;
              }
            #doorOpenStatusDriverRear.on,#doorOpenStatusDriver.on{
                transform: rotate(45deg);
                -webkit-transform-origin: 50% 0 0 !important;
                transform-box: fill-box !important;
                -webkit-transition: transform 1s linear;
                transition: transform 1s linear;
              }
            #doorOpenStatusPassengerRear.off,#doorOpenStatusPassenger.off{
                transform: none;
                -webkit-transform-origin: 50% 0 0 !important;
                transform-box: fill-box !important;
                -webkit-transition: transform 1s linear;
                transition: transform 1s linear;
              }
            #doorOpenStatusPassengerRear.on,#doorOpenStatusPassenger.on{
                transform: rotate(-45deg);
                -webkit-transform-origin: 50% 0 0 !important;
                transform-origin: 50% 0 0px !important;
                transform-box: fill-box !important;
                -webkit-transition: transform 1s linear;
                transition: transform 1s linear;
              }

            /* 警告状态 */
            @-webkit-keyframes alert {
              0% {opacity: 0}
              50% {opacity: 1}
              100% {opacity: 0}
            }
            .active{
                fill:var(--paper-item-icon-active-color);
                opacity:1;
            }
            .inactive{
                opacity:0.05;
            }
        `
    }
    firstUpdated(changedProperties) {
        preloadCard("map");
        customElements.get("hui-map-card");
        
        var cps = changedProperties;
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        // link.id = fontID;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://fonts.googleapis.com/css?family=Six+Caps&display=swap';
        link.media = 'all';
        head.appendChild(link);
        
        let mapContainer = this.shadowRoot.getElementById("map");
            // 2021-12-02 之后申请的 key 必须配置安全密钥(securityJsCode), 需在 AMapLoader.load 之前设置
            if (this.config.securityJsCode) {
                window._AMapSecurityConfig = Object.assign({}, window._AMapSecurityConfig || {}, {
                    securityJsCode: this.config.securityJsCode
                });
            }
            AMapLoader.load({
                key: this.config.key || "f87e0c9c4f3e1e78f963075d142979f0",   // 优先使用编辑器里配置的Key, 未配置时回退到默认Key
                version: "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ['AMap.MoveAnimation'] //插件列表
              }).then(()=>{
                
                this.map = new AMap.Map(mapContainer,{
                  viewMode: '3D',
                  center:[this.hass.config.longitude,this.hass.config.latitude],
                  zoom: 20
                });
                this.map.setMapStyle("amap://styles/normal"); // dd4b068ab6cbe7c07b9235c4157068d8
                this.map.setPitch(60);
                this.marker = new AMap.Marker({
                    map: this.map,
                    position: [this.hass.config.longitude,this.hass.config.latitude],
                    icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
                    offset: new AMap.Pixel(-13, -30),
                    zIndex: 1
                  });

                this.trafficLayer = new AMap.TileLayer.Traffic({
                    zIndex: 10
                });
                this.trafficLayer.setMap(this.map);
            }).catch(e => {
                console.log(e);
            });

    }
}
customElements.define('car-card', CarCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "car-card",
  name: "car",
  preview: true, // Optional - defaults to false
  description: "车辆仪表盘" // Optional
});
function deepClone(value) {
    if (!(!!value && typeof value == 'object')) {
      return value;
    }
    if (Object.prototype.toString.call(value) == '[object Date]') {
      return new Date(value.getTime());
    }
    if (Array.isArray(value)) {
      return value.map(deepClone);
    }
    var result = {};
    Object.keys(value).forEach(
      function(key) { result[key] = deepClone(value[key]); });
    return result;
  }
