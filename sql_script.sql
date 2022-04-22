drop table IF EXISTS node_red.pump_log;
drop table IF EXISTS node_red.pump_nodes;
use node_red;
CREATE TABLE node_red.pump_log(
  pumpLogID int NOT NULL primary key AUTO_INCREMENT,
  MPRX_DI_dos1_flowrate int,
  MPRX_DI_dos2_flowrate int,
  MPRX_DI_dos3_flowrate int,
  MPRX_DI_fog_flowrate int,
  MPRX_DI_fog_foam_air int,
  MPRX_DI_fog_foam_density int,
  MPRX_DI_fog_foam_loss int,
  MPRX_DI_fog_foam_agent int,
  MPRX_DI_mix_speed int,
  MPRX_DI_mix_disabled int,
  MPRX_DI_water_set_flowrate int,
  MPRX_EXT_dos1_run int,
  MPRX_EXT_dos2_run int,
  MPRX_EXT_dos3_run int,
  MPRX_EXT_fog_run int,
  MPRX_EXT_heartbeat int,
  MPRX_EXT_mix_run int,
  MPRX_EXT_pump_run int,
  MPRX_EXT_pump_speed int,
  MPTX_DI_air_humidity int,
  MPTX_DI_air_temperature int,
  MPTX_DI_mortar_temperature int,
  MPTX_DI_water_temperature int,
  MP_auto_on int,
  MP_dos1_flowrate_current int,
  MP_dos2_flowrate_current int,
  MP_dos3_flowrate_current int,
  MP_eror_any_active int,
  MP_master_on int,
  MP_pump_pressure_current int,
  MP_waterflowrate_current int,
  Log_datetime datetime
);
# CREATE TABLE node_red.pump_nodes(
#	pumpNodeId int NOT NULL primary key AUTO_INCREMENT,
#	pump_NodeId varchar(50),
#	pump_NodeName varchar(50),
#	pump_NodeType varchar(10)
#) ;
