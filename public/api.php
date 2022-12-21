<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
$toDay = date('Y-m-d H:i:s');

/*Consulta sku-modelo*/
if (isset($_GET["model"]) && isset($_GET["isList"])) {
    $_model        = $_GET["model"];
    $_isList    = $_GET["isList"];
    if ($_isList == true) {
        $check_sql = "EXEC sp_ic_seachTableSku '" . $_model . "'";
        // sc_lookup(rs, $check_sql);
        $rs = [
            ["18805089589", "ZAPATILLAS", "R18 R18-CY020 (35-39) - M TEXTIL ROSADO-37.0", "9", "https://sip.footloose.pe/web/_images/1x/717_106836_00010007_052_2_213_001.jpg"],
            ["18805089594", "ZAPATILLAS", "R18 R18-CY020 (35-39) - M TEXTIL LILA-37.0", "4", "https://sip.footloose.pe/web/_images/1x/717_106836_00010007_052_2_142_001.jpg"]
        ];
        $optionsLength = count($rs);
        if ($optionsLength > 0) {
            echo json_encode(utf8_converter($rs));
            exit();
        } else {
            header("HTTP/1.0 404 Not Found", true, 404);
            exit();
        }
    } else {
        header("HTTP/1.0 204 No Content", true, 204);
        exit();
    }
}
/*Consulta precio y stock de SKU*/ else if (isset($_GET["sku"]) && isset($_GET["isPromoter"])) {
    $_sku             = $_GET["sku"];
    $_isPromoter     = $_GET["isPromoter"];
    if ($_isPromoter == true && $_sku != "") {
        $check_sql = "EXEC  sp_md_getStockPrice '" . $_sku . "', '1'";
        // sc_lookup(rs, $check_sql);
        $rs = [["FOOTLOOSE FCH-WL021 (35-40) TRIXI - M SINTETICO NEGRO-35.0", "249.00", "193.80", "193.80", 2, "18805085883", "https://sip.footloose.pe/web/_images/1x/585_106611_00010010_040_2_168_001.jpg", "3.80", "N", "44"]];
        $optionsLength = count($rs);
        if ($optionsLength > 0) {
            $_data = utf8_converter($rs[0]);
            if ($_data[0] == 'ERROR') {
                header("HTTP/1.0 404 Not Found", true, 404);
                exit();
            } else {
                echo json_encode($_data);
                exit();
            }
        } else {
            header("HTTP/1.0 404 Not Found", true, 404);
            exit();
        }
    } else {
        header("HTTP/1.0 401 Unauthorized", true, 401);
        exit();
    }
} else if (isset($_GET["personaId"]) && isset($_GET["isDirector"])) {
    $_personaId        = $_GET["personaId"];
    $_isDirector     = $_GET["isDirector"];
    if ($_isDirector == true && $_personaId != "") {
        $check_sql = "SELECT id_socio, CONCAT(paterno, ' ', materno, ' ', nombres), num_doc, nombres, CONCAT(paterno, ' ', materno), correo, celular FROM ecommerce.tb_socios_catalogo WHERE afiliadopor=$_personaId";
        // sc_lookup(rs, $check_sql);
        $rs = [["1", "PUMA SALCEDO LUIS FERNANDO", "74867620", "LUIS FERNANDO", "PUMA SALCEDO", "correo@correo.com", "958762123"], ["3", "GERARDO RAMIREZ", "29675691", "MIGUEL SERAFIN", "PUMA LARICO", "correo1@correo.com", "987654321"]];
        $optionsLength = count($rs);
        if ($optionsLength > 0) {
            $_data = utf8_converter($rs);
            if ($_data[0] == 'ERROR') {
                header("HTTP/1.0 404 Not Found", true, 404);
                exit();
            } else {
                echo json_encode($_data);
                exit();
            }
        } else {
            header("HTTP/1.0 404 Not Found", true, 404);
            exit();
        }
    } else {
        header("HTTP/1.0 401 Unauthorized", true, 401);
        exit();
    }
}
/*Consultar Lista de tiendas*/
else if (isset($_GET["isStore"]) && isset($_GET["isList"]) ) {
	$_isStore 	= $_GET["isStore"];
	$_isList	= $_GET["isList"];
	if($_isList == true && $_isStore == true ){
		$check_sql = "SELECT c.fox_nombre,CONCAT('T',c.fox_nombre,' - ',dbo.InitCap (a.DIRECCION)) FROM bd_passarela.dbo.CANALVENTA AS c INNER JOIN bd_passarela.dbo.ALMACEN AS a ON a.fox_nombre = c.fox_nombre WHERE c.fox_nombre IS NOT NULL AND c.fox_nombre <> '' AND c.activo = 1 AND a.EST_DISTRIBUCION = 'S' ORDER BY a.fox_nombre ASC";
		// sc_lookup(rs, $check_sql,"bd_passarela");
        $rs = [
            ["02", "T02 - Jr. De La Union Nro. 553 Lima - Lima - Lima"],
            ["04", "T04 - Av. Horacio Urteaga 1337- Jesus Maria"],
            ["07", "07 - Jr. De La Union 777 - Cercado De Lima"]
        ];
		$optionsLength = count($rs);
		if ($optionsLength > 0){
			echo json_encode(utf8_converter($rs)); 
			exit();
		}
		else{
			header("HTTP/1.0 404 Not Found", true, 404);
			exit();
		}
	}
	else{
		header("HTTP/1.0 401 Unauthorized", true, 401);
		exit();
	}
}
/*Consulta lista de ubigeos*/
else if (isset($_GET["isZipcodeList"]) && isset($_GET["isList"])) {
	$_isZipcodeList	= $_GET["isZipcodeList"];
	$_isList		= $_GET["isList"];
	if($_isZipcodeList == true && $_isList == true ){
		$check_sql = "SELECT ubigeo, CONCAT(departamento,' - ',provincia,' - ',distrito) FROM ecommerce.tb_ubigeo WHERE ubigeo <> '000000'";
		// sc_lookup(rs, $check_sql);
        $rs = [
            ["010101","Amazonas - Chachapoyas - Chachapoyas"],["010102","Amazonas - Chachapoyas - Asunci\u00f3n"],["010103","Amazonas - Chachapoyas - Balsas"],["010104","Amazonas - Chachapoyas - Cheto"],["010105","Amazonas - Chachapoyas - Chiliquin"],["010106","Amazonas - Chachapoyas - Chuquibamba"],["010107","Amazonas - Chachapoyas - Granada"],["010108","Amazonas - Chachapoyas - Huancas"],["010109","Amazonas - Chachapoyas - La Jalca"],["010110","Amazonas - Chachapoyas - Leimebamba"],["010111","Amazonas - Chachapoyas - Levanto"],["010112","Amazonas - Chachapoyas - Magdalena"],["010113","Amazonas - Chachapoyas - Mariscal Castilla"],["010114","Amazonas - Chachapoyas - Molinopampa"],["010115","Amazonas - Chachapoyas - Montevideo"],["010116","Amazonas - Chachapoyas - Olleros"],["010117","Amazonas - Chachapoyas - Quinjalca"],["010118","Amazonas - Chachapoyas - San Francisco de Daguas"],["010119","Amazonas - Chachapoyas - San Isidro de Maino"],["010120","Amazonas - Chachapoyas - Soloco"],["010121","Amazonas - Chachapoyas - Sonche"],["010150","Azuay - Cuenca - Cuenca"],["010151","Azuay - Cuenca - Ba\u00f1os"],["010152","Azuay - Cuenca - Cumbe"],["010153","Azuay - Cuenca - Chaucha"]        ];
		$optionsLength = count($rs);
		if ($optionsLength > 0){
			echo json_encode(utf8_converter($rs)); 
			exit();
		}
		else{
			header("HTTP/1.0 404 Not Found", true, 404);
			exit();
		}
	}
	else{
		header("HTTP/1.0 401 Unauthorized", true, 401);
		exit();
	}
}
else if (isset($_POST["fechaCierre"]) && isset($_POST["xmlDetalle"]) && isset($_POST["personaIns"]) && isset($_POST["socioId"])) {
    $_idPersona		= $_POST["personaIns"];
    $_codigoOrder   = getNumberOrder($_idPersona);
    $_idDirector    = $_POST["personaIns"];
    $_fechaCierre   = $_POST["fechaCierre"];
    $_xmlDetalle    = $_POST["xmlDetalle"];
    $_idSocio       = $_POST["socioId"];
    $_sitioWeb      = 'Director';
    $_idEstado      = 40;

    $insert_sql = "EXEC sp_am_insUpdPedidoCatalogo '$_codigoOrder', '$_fechaCierre', '$toDay', '$_sitioWeb', '$_xmlDetalle', '$_idEstado', '$_idPersona', '$_idDirector', '$_idSocio'";

    $check_sql = $insert_sql;
	// sc_lookup(rs, $check_sql,"conn_mssql_ecommerce");
	//if ({rs[0][0]} == 'SUCCESS'){
    $rs = [['SUCCESS']];
	if ($rs[0][0] == 'SUCCESS'){
		// echo json_encode({rs[0]});
		echo json_encode($rs[0]);
	}
	else{
		// header("HTTP/1.0 500 Internal Server ".$sentence." Error ".json_encode({rs}), true, 500);
		header("HTTP/1.0 500 Internal Server Error ", true, 500);
		exit();
	}
}
else{
	header("HTTP/1.0 400 Bad Request", true, 400);
	echo json_encode("No hay Consultas");
	exit();
}

function getNumberOrder($idPersona){
	$check_sql = "SELECT 'DIR'+CAST(".$idPersona." AS VARCHAR(8)) + RIGHT('000000' + CAST(COUNT(*) + 1 AS VARCHAR(6)),6) FROM ecommerce.tb_cabecera_pedido_socio AS tcpw WHERE tcpw.id_director = '".$idPersona."' ";
	// sc_lookup(rs, $check_sql,"conn_mssql_ecommerce");

    return 'DIR762145000001'; 
}

function utf8_converter($array)
{
    array_walk_recursive($array, function (&$item, $key) {
        if (!mb_detect_encoding($item, 'utf-8', true)) {
            $item = utf8_encode($item);
        }
    });
    return $array;
}

function verifica_rango($date_inicio, $date_fin, $date_nueva)
{
    $date_inicio = strtotime($date_inicio);
    $date_fin = strtotime($date_fin);
    $date_nueva = strtotime($date_nueva);
    if (($date_nueva >= $date_inicio) && ($date_nueva <= $date_fin))
        return true;
    return false;
}
