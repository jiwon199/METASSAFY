using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.SceneManagement;
public class SkinManager : MonoBehaviour
{
    Vector3 m_vecMouseDownPos;
    public int skin;
    public GameObject ValueManager;
    // Start is called before the first frame update
    void Start()
    {
        skin = 0;
        ValueManager.GetComponent<ValueManager>().setSkin(this.skin);
    }

    // Update is called once per frame
    void Update()
    {
        ClickEvent();
    }
    public void ClickEvent()
    {
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
            if (Physics.Raycast(ray, out hit))
            {
                Debug.Log(hit.collider.name + " ����");
                if (hit.collider.name== "WhiteBoy")
                {
                    GameObject.Find("WhiteBoy").GetComponent<Outline>().enabled = true;
                    GameObject.Find("BlackBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlueBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("WhiteGirl").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlackGirl").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlueGirl").GetComponent<Outline>().enabled = false;

                    setSkinNo(0);
                    
                }
                else if (hit.collider.name == "BlackBoy")
                {
                    GameObject.Find("WhiteBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlackBoy").GetComponent<Outline>().enabled = true;
                    GameObject.Find("BlueBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("WhiteGirl").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlackGirl").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlueGirl").GetComponent<Outline>().enabled = false;

                    setSkinNo(1);
                    
                }
                else if (hit.collider.name == "BlueBoy")
                {
                    GameObject.Find("WhiteBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlackBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlueBoy").GetComponent<Outline>().enabled = true;
                    GameObject.Find("WhiteGirl").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlackGirl").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlueGirl").GetComponent<Outline>().enabled = false;

                    setSkinNo(2);
                    
                }
                else if (hit.collider.name == "WhiteGirl")
                {
                    GameObject.Find("WhiteBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlackBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlueBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("WhiteGirl").GetComponent<Outline>().enabled = true;
                    GameObject.Find("BlackGirl").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlueGirl").GetComponent<Outline>().enabled = false;

                    setSkinNo(3);
                   
                }
                else if (hit.collider.name == "BlackGirl")
                {
                    GameObject.Find("WhiteBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlackBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlueBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("WhiteGirl").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlackGirl").GetComponent<Outline>().enabled = true;
                    GameObject.Find("BlueGirl").GetComponent<Outline>().enabled = false;

                    setSkinNo(4);
                     
                }
                else if (hit.collider.name == "BlueGirl")
                {
                    GameObject.Find("WhiteBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlackBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlueBoy").GetComponent<Outline>().enabled = false;
                    GameObject.Find("WhiteGirl").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlackGirl").GetComponent<Outline>().enabled = false;
                    GameObject.Find("BlueGirl").GetComponent<Outline>().enabled = true;

                    setSkinNo(5);
                   
                }

            }

        }
    }

     
    public void setSkinNo(int no)
    {
        skin = no;
        ValueManager.GetComponent<ValueManager>().setSkin(no);
    }
    public void moveScene()
    {
        SceneManager.LoadScene("WorldMap");
    }
}
