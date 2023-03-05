 
using Photon.Pun;
using Photon.Pun.UtilityScripts;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using Unity.VisualScripting;
using Unity.VisualScripting.Antlr3.Runtime;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;
using UnityEngine.Video;


public class SelectObjectManager : MonoBehaviourPunCallbacks, IDragHandler
{

    [DllImport("__Internal")]
    private static extern void openPhone(string mode);
    Vector3 m_vecMouseDownPos;

    //Boolean isRoomInfoOpen = true; //��� �ٲ�
    public GameObject tree;
    public GameObject popup;
    public VideoPlayer my_video;
    
    void Update()
    {

        ClickEvent();
       // PressEvent();

    }
    float distance = 10.0f;
    public void OnDrag(PointerEventData eventData)
    {
        Debug.Log("onDrag ȣ��");
        Vector3 mousePosition = new Vector3(Input.mousePosition.x,
                Input.mousePosition.y, distance);
        transform.position = mousePosition;
    }

    void ClickEvent()
    {

        // ���콺 Ŭ�� ��
        if (Input.GetMouseButtonDown(0))
        {
            // Debug.Log("Ŭ���̺�Ʈ �߻�: "+photonView.ViewID);
            if (EventSystem.current.IsPointerOverGameObject())
                return;
            m_vecMouseDownPos = Input.mousePosition;

            // ī�޶󿡼� ��ũ���� ���콺 Ŭ�� ��ġ�� ����ϴ� ������ ��ȯ�մϴ�.
            Ray ray = Camera.main.ScreenPointToRay(m_vecMouseDownPos);
            RaycastHit hit;

            // �������� �浹�� collider�� hit�� �ֽ��ϴ�.
            if (Physics.Raycast(ray, out hit, 20.0f))
            {
                
                if (hit.collider.name == "GumiCam")
                    goToRoom("Gumi");
                if(hit.collider.name== "SeoulCam")
                {
                    goToRoom("Seoul");
                }
                if (hit.collider.name == "GoLobby")
                {
                    goToRoom("WorldMap");
                }
                if (hit.collider.name == "�ο��")
                {
                    goToRoom("BUK");
                }
                /*if (hit.collider.name == "����")
                {
                    goToRoom("Daejeon");
                }*/
                if (hit.collider.name == "board")
                {
                    clickBoard();
                }
                if (hit.collider.name=="����" || hit.collider.name == "����")
                {
                    popup.SetActive(true);
                }
                if (hit.collider.name == "tree")
                {
                    // GameObject tree= GameObject.FindGameObjectWithTag("tree");
                    tree.SetActive(true);
                }
                if (hit.collider.tag == "Player")
                {
                    GameObject hitTarget = hit.collider.gameObject;
                    // Debug.Log(hitTarget.GetComponentInChildren<TextMesh>().text);
                    name = hitTarget.GetComponentInChildren<TextMesh>().text;
                    clickUser();
                }
                if (hit.collider.name == "VideoPlane")
                {
                    playVideo();
                }
                if (hit.collider.name == "record") {
                    Debug.Log(hit.collider.name);
                    playMusic();
                }
                

            }

        }
    }
    //������ �˾� ����
    public void canclePopup()
    {
        popup.SetActive(false);
    }
    public void cancleTree()
    {
        //GameObject tree = GameObject.FindGameObjectWithTag("tree");
        tree.SetActive(false);
    }
    public void goToRoom(string name)
    {

        //��� �÷��̾� �߿���
        GameObject[] players = GameObject.FindGameObjectsWithTag("Player");
        for (int i = 0; i < players.Length; i++)
        {    //�̵��� ��(=�ڱ� �ڽ�)�� ��Ʈ��ũ���� ���� 
            if (players[i].GetComponent<PhotonView>().IsMine)
            {
                PhotonNetwork.Disconnect();
            }
        }
        //�� �̵�
        SceneManager.LoadScene(name);

    }

    void playVideo()
    {
        if (my_video != null)
        {
            if (my_video.isPlaying)
            {
                //Debug.Log(my_video.GetDirectAudioMute(0));
                my_video.Pause();
            }
            else
            {
                //Debug.Log(my_video.GetDirectAudioMute(0));
                //my_video.SetDirectAudioMute(0, true);
                my_video.Play();
            }
        }
    }
 
    public void enterVideo(string RoomName)
    {
        //����Ʈ ���� ������� �޼��� ������
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    openPhone (RoomName);
#endif
    }

    public void clickPhone()
    {

#if UNITY_WEBGL == true && UNITY_EDITOR == false
    openPhone ("phone");
#endif
    }

    public void clickUser()
    {

#if UNITY_WEBGL == true && UNITY_EDITOR == false
    openPhone (name);
#endif
    }

    public void clickBoard() {
#if UNITY_WEBGL == true && UNITY_EDITOR == false
    openPhone ("board");
#endif
    }

    public void playMusic() {
        /*
        #if UNITY_WEBGL == true && UNITY_EDITOR == false
            openPhone ("music");
        #endif
        */
       

    }

}