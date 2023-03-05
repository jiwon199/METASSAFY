using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Photon.Pun;
using Unity.VisualScripting;
using UnityEngine.SceneManagement;
using UnityStandardAssets.Utility;
using Photon.Realtime;

public class Launcher : MonoBehaviourPunCallbacks
{
    public PhotonView [] playerPrefabs;
    public GameObject loading;
 
    void Start()
    {
        loading.SetActive(true);
        Debug.Log("launcher ����");
        
        PhotonNetwork.ConnectUsingSettings();
    }
     
    public override void OnConnectedToMaster()
    {
        Debug.Log("�濡 �����ϴ� ��..");
      
        if (SceneManager.GetActiveScene().name == "Lobby")
        {
            Debug.Log("�κ� ����..");
            PhotonNetwork.JoinOrCreateRoom("Lobby", null, null);
        }
        else if(SceneManager.GetActiveScene().name == "Gumi")
        {
            Debug.Log("���� ����..");
            PhotonNetwork.JoinOrCreateRoom("Gumi", null, null);
        }
        else if (SceneManager.GetActiveScene().name=="Seoul")
        {
            PhotonNetwork.JoinOrCreateRoom("Seoul", null, null);
        }
        else if (SceneManager.GetActiveScene().name == "BUK")
        {
            PhotonNetwork.JoinOrCreateRoom("BUK", null, null);
        }
        else
        {
            PhotonNetwork.JoinOrCreateRoom("Lobby", null, null); 
        }
    }
    public override void OnJoinedRoom()
    {
        Debug.Log("�� ���� ����");
       
        loading.SetActive(false);
        int skin;
        if (GameObject.Find("ValueManager") != null)
            skin = GameObject.Find("ValueManager").GetComponent<ValueManager>().skin;
        else
            skin = 0;
         
        GameObject p= PhotonNetwork.Instantiate(playerPrefabs[skin].name, Vector3.zero, Quaternion.identity);
       
        Transform t = p.GetComponent<Transform>();
       // GameObject.Find("Main Camera").GetComponent<SmoothFollowCam>().target = t.Find("CamPivot").transform;

        //�̸��� ���δ�.
        setNickName(t);
   
    }
    public void setNickName(Transform t)
    {
        string name;
        if (GameObject.Find("ValueManager") != null)
            name = GameObject.Find("ValueManager").GetComponent<ValueManager>().nickname;
        else
            name = "�͸�";

        PhotonNetwork.LocalPlayer.NickName = name;
    }

     

}
