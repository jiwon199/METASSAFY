using Photon.Pun;
using Photon.Pun.Demo.PunBasics;
using Photon.Realtime;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Net;
using UnityEditor.Rendering;
using UnityEngine;
using UnityEngine.UI;

public class ShowRoom : MonoBehaviourPunCallbacks
{
    public PhotonView PV;
   // Boolean isOpen = false;
    //Boolean isAdd = false;
    public GameObject infoArea;
    void Start()
    {
        infoArea = GameObject.FindGameObjectWithTag("RoomInfo");
        if (infoArea == null) return;

        infoArea.GetComponent<Transform>().Find("RoomName").GetComponent<Text>().text = PhotonNetwork.CurrentRoom.Name + "의 참여자들";

        Debug.Log(PV.Owner.NickName);
        PV.RPC("updatePlayer", RpcTarget.AllBuffered);
        //infoArea.SetActive(false);

    }
    
    // Update is called once per frame
    void Update()
    {
         
    }
    public override void OnLeftRoom()
    {
        Debug.Log("연결 끊어짐!");
        PV.RPC("updatePlayer", RpcTarget.AllBuffered);
    }
    public override void OnDisconnected(DisconnectCause cause)
    {
        Debug.Log("연결 끊어짐2!");
        PV.RPC("updatePlayer", RpcTarget.AllBuffered);
    }
  

    //누군가 들어오면 플레이어 리스트를 갱신
    [PunRPC]
    private void updatePlayer()
    {

        Debug.Log(name + " 입장" + PV.IsMine);
        string playerList = "";

        for (int i = 0; i < PhotonNetwork.PlayerList.Length; i++)
        {
            playerList += PhotonNetwork.PlayerList[i].NickName + "\n";
        }

        infoArea.GetComponent<Transform>().Find("playerList").GetComponent<Text>().text = playerList;

    }

    
}
